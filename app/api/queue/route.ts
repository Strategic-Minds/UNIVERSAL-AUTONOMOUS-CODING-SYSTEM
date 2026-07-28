import { NextRequest, NextResponse } from 'next/server'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

async function sbGet(table: string, query = '') {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY }
  })
  return res.ok ? await res.json() : []
}

async function sbPost(table: string, data: unknown) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${SUPABASE_KEY}`, 'apikey': SUPABASE_KEY, 'Content-Type': 'application/json', 'Prefer': 'return=representation' },
    body: JSON.stringify(data),
  })
  return res.ok ? await res.json() : null
}

export async function GET() {
  const projects = await sbGet('uacs_projects', '?order=created_at.desc&limit=50')
  const queue = await sbGet('uacs_queue', '?status=neq.completed&order=queued_at.asc')
  return NextResponse.json({ projects, queue, count: projects.length })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const project = await sbPost('uacs_projects', {
    name: body.project_name || body.name,
    description: body.description,
    business_goal: body.business_goal || 'revenue',
    target_user: body.target_user,
    priority: body.priority || 'P3',
    status: 'idea',
    notes: body.notes,
    assigned_agent: 'apex',
    submitted_by: 'jeremy',
  })
  if (project) {
    await sbPost('uacs_queue', {
      project_id: project[0]?.id,
      project_name: body.project_name || body.name,
      phase: 'idea',
      agent: 'apex',
      status: 'queued',
      priority: body.priority || 'P3',
    })
  }
  return NextResponse.json({ success: true, project: project?.[0] })
}
