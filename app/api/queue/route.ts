import { NextRequest, NextResponse } from 'next/server';
import { requireServerToken } from '@/lib/server/require-token';

// Operator-only API. The browser UI must use an authenticated server session;
// it must never receive the operator token.
const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const dbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

function ready() {
  return Boolean(dbUrl?.startsWith('https://') && dbKey);
}
async function sbGet(table: string, query: string) {
  const response = await fetch(dbUrl + '/rest/v1/' + table + query, {
    headers: { Authorization: 'Bearer ' + dbKey, apikey: dbKey ?? '' },
  });
  if (!response.ok) throw new Error('Read failed');
  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error('Invalid read receipt');
  return data;
}
async function sbPost(table: string, record: Record<string, unknown>): Promise<Record<string, unknown>> {
  const response = await fetch(dbUrl + '/rest/v1/' + table, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + dbKey, apikey: dbKey ?? '',
      'Content-Type': 'application/json', Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
  });
  if (!response.ok) throw new Error('Write failed');
  const rows: unknown = await response.json();
  if (!Array.isArray(rows) || !rows[0] || typeof rows[0] !== 'object') {
    throw new Error('Missing write receipt');
  }
  return rows[0] as Record<string, unknown>;
}

export async function GET(request: NextRequest) {
  const denied = requireServerToken(request, 'UACS_OPERATOR_TOKEN');
  if (denied) return denied;
  if (!ready()) return NextResponse.json({ error: 'Storage not configured' }, { status: 503 });
  try {
    const [projects, queue] = await Promise.all([
      sbGet('uacs_projects', '?order=created_at.desc&limit=50'),
      sbGet('uacs_queue', '?status=neq.completed&order=queued_at.asc'),
    ]);
    return NextResponse.json({ projects, queue, count: projects.length });
  } catch {
    return NextResponse.json({ error: 'Unable to verify queue state' }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  const denied = requireServerToken(request, 'UACS_OPERATOR_TOKEN');
  if (denied) return denied;
  if (!ready()) return NextResponse.json({ success: false, error: 'Storage not configured' }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid body');
    body = input as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON object' }, { status: 400 });
  }

  const name = typeof body.project_name === 'string' ? body.project_name.trim() :
    typeof body.name === 'string' ? body.name.trim() : '';
  const priority = typeof body.priority === 'string' ? body.priority : 'P3';
  if (!name || name.length > 160 || !['P1', 'P2', 'P3', 'P4'].includes(priority)) {
    return NextResponse.json({ success: false, error: 'Invalid name or priority' }, { status: 422 });
  }

  let projectId: string | null = null;
  try {
    const project = await sbPost('uacs_projects', {
      name,
      description: typeof body.description === 'string' ? body.description.slice(0, 10000) : null,
      business_goal: typeof body.business_goal === 'string' ? body.business_goal : null,
      priority, status: 'idea',
      notes: typeof body.notes === 'string' ? body.notes.slice(0, 10000) : null,
      assigned_agent: 'apex', submitted_by: 'operator',
    });
    projectId = typeof project.id === 'string' ? project.id : null;
    if (!projectId) throw new Error('Missing project receipt');
    const queued = await sbPost('uacs_queue', {
      project_id: projectId, project_name: name,
      phase: 'idea', agent: 'apex', status: 'queued', priority,
    });
    return NextResponse.json({ success: true, project_id: projectId, queue_id: queued.id });
  } catch {
    return NextResponse.json({
      success: false, partial: projectId !== null, project_id: projectId,
      error: 'Queue submission not fully persisted; reconcile before retry',
    }, { status: 502 });
  }
}
