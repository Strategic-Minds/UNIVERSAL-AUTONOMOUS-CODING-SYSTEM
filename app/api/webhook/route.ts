import { NextRequest, NextResponse } from 'next/server'

const BRIDGE_SECRET = process.env.BRIDGE_SHARED_SECRET || ''
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

function auth(req: NextRequest): boolean {
  const h = req.headers.get('authorization') || ''
  return !BRIDGE_SECRET || h === `Bearer ${BRIDGE_SECRET}`
}

async function sbPatch(table: string, id: string, data: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?id=eq.${id}`, {
    method: 'PATCH',
    headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return res.ok
}

async function sbPost(table: string, data: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  })
  return res.ok ? await res.json() : null
}

export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await req.json()
  const { event_type, project_id, agent, data, qa_score } = body

  // ChatGPT sends back brand packages
  if (event_type === 'brand_complete' && project_id) {
    await sbPatch('uacs_projects', project_id, { status: 'visual_approval', updated_at: new Date().toISOString() })
    await sbPost('uacs_brand_packages', { project_id, ...data })
  }

  // BrowserWorker sends back QA results
  if (event_type === 'qa_complete' && project_id) {
    const passed = (qa_score || 0) >= 90
    await sbPatch('uacs_projects', project_id, {
      qa_score,
      faang_passed: passed,
      status: passed ? 'deploy' : 'build',
      updated_at: new Date().toISOString(),
    })
    await sbPost('uacs_qa_results', {
      project_id,
      total_score: qa_score,
      ship_it: passed,
      ...data,
      tested_at: new Date().toISOString(),
    })
  }

  // Generic status update
  if (event_type === 'status_update' && project_id) {
    await sbPatch('uacs_projects', project_id, { status: data?.status, updated_at: new Date().toISOString() })
  }

  await sbPost('uacs_notifications', {
    project_id,
    channel: 'dashboard',
    message: `[${agent}] ${event_type}: ${JSON.stringify(data).slice(0, 200)}`,
    sent: true,
    sent_at: new Date().toISOString(),
  })

  return NextResponse.json({ received: true, event_type, project_id })
}

export async function GET() {
  return NextResponse.json({ endpoint: 'UACS Webhook', events: ['brand_complete','qa_complete','status_update'], status: 'listening' })
}
