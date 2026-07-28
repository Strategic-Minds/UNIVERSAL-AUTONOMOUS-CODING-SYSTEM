import { NextRequest, NextResponse } from 'next/server'

// ============================================================
// UACS BIDIRECTIONAL BRIDGE
// ChatGPT <-> Base44 <-> APEX
// All agent communication flows through this endpoint
// ============================================================

const BRIDGE_SECRET = process.env.BRIDGE_SHARED_SECRET || ''
const CHATGPT_BRIDGE = process.env.CHATGPT_BRIDGE_URL || 'https://xtreme-ai-bridge.vercel.app'
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function auth(req: NextRequest): boolean {
  const h = req.headers.get('authorization') || ''
  return h === `Bearer ${BRIDGE_SECRET}` || !BRIDGE_SECRET
}

async function supabaseInsert(table: string, data: Record<string, unknown>) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'apikey': SUPABASE_KEY,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(data),
  })
  return res.ok ? await res.json() : null
}

export async function GET(req: NextRequest) {
  return NextResponse.json({
    system: 'UACS Bidirectional Bridge',
    version: '1.0.0',
    status: 'operational',
    agents: ['apex', 'chatgpt', 'browserworker'],
    endpoints: {
      POST_job: '/api/bridge — submit a job to any agent',
      GET_status: '/api/bridge?job_id=xxx — check job status',
    },
    timestamp: new Date().toISOString(),
  })
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { type, agent, project_id, project_name, payload, priority } = body

  // Log to build_log in Supabase
  await supabaseInsert('uacs_build_log', {
    project_id,
    phase: type || 'bridge',
    agent: agent || 'apex',
    action: `bridge_${type}`,
    status: 'started',
    details: { payload, priority },
    logged_at: new Date().toISOString(),
  }).catch(() => null)

  // Route to the right agent
  if (agent === 'chatgpt') {
    // Forward to ChatGPT bridge
    try {
      const resp = await fetch(`${CHATGPT_BRIDGE}/api/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${BRIDGE_SECRET}` },
        body: JSON.stringify({ type, project_id, project_name, payload }),
      })
      const result = await resp.json()
      return NextResponse.json({ success: true, agent: 'chatgpt', result, routed_to: CHATGPT_BRIDGE })
    } catch (e) {
      return NextResponse.json({ success: false, error: String(e), fallback: 'queued_locally' })
    }
  }

  if (agent === 'browserworker') {
    const BW_URL = process.env.BROWSERWORKER_URL || ''
    const BW_SECRET = process.env.BROWSERWORKER_SECRET || ''
    try {
      const resp = await fetch(`${BW_URL}/api/run`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${BW_SECRET}` },
        body: JSON.stringify(payload),
      })
      const result = await resp.json()
      return NextResponse.json({ success: true, agent: 'browserworker', result })
    } catch (e) {
      return NextResponse.json({ success: false, error: String(e) })
    }
  }

  // Default: APEX handles it (Base44 is APEX)
  return NextResponse.json({
    success: true,
    agent: 'apex',
    message: 'Job received by APEX',
    job: { type, project_id, project_name, priority, received_at: new Date().toISOString() },
  })
}
