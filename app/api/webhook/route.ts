import { NextRequest, NextResponse } from 'next/server';
import { requireServerToken } from '@/lib/server/require-token';

// A provider callback is unverified input, never an authorization to deploy.
const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const dbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

type ObjectRecord = Record<string, unknown>;
function isObject(value: unknown): value is ObjectRecord {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function score(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.min(25, Math.max(0, Math.floor(value))) : 0;
}
async function sbPost(table: string, record: ObjectRecord): Promise<boolean> {
  const response = await fetch(dbUrl + '/rest/v1/' + table, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + dbKey, apikey: dbKey ?? '',
      'Content-Type': 'application/json', Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
  });
  if (!response.ok) return false;
  const rows: unknown = await response.json();
  return Array.isArray(rows) && rows.length > 0;
}
async function sbPatch(table: string, id: string, record: ObjectRecord): Promise<boolean> {
  const response = await fetch(dbUrl + '/rest/v1/' + table + '?id=eq.' + encodeURIComponent(id), {
    method: 'PATCH',
    headers: {
      Authorization: 'Bearer ' + dbKey, apikey: dbKey ?? '',
      'Content-Type': 'application/json', Prefer: 'return=representation',
    },
    body: JSON.stringify(record),
  });
  if (!response.ok) return false;
  const rows: unknown = await response.json();
  return Array.isArray(rows) && rows.length === 1;
}

export async function GET() {
  return NextResponse.json({ endpoint: 'UACS callback', status: 'unverified' });
}

export async function POST(request: NextRequest) {
  const denied = requireServerToken(request, 'BRIDGE_SHARED_SECRET');
  if (denied) return denied;
  if (!dbUrl?.startsWith('https://') || !dbKey) {
    return NextResponse.json({ received: false, error: 'Durable storage unavailable' }, { status: 503 });
  }

  let body: ObjectRecord;
  try {
    const parsed: unknown = await request.json();
    if (!isObject(parsed)) throw new Error('Invalid body');
    body = parsed;
  } catch {
    return NextResponse.json({ received: false, error: 'Invalid JSON object' }, { status: 400 });
  }
  const event = body.event_type;
  const agent = body.agent;
  const projectId = body.project_id;
  const data = isObject(body.data) ? body.data : {};
  if (typeof projectId !== 'string' || !/^[a-f0-9-]{36}$/i.test(projectId)) {
    return NextResponse.json({ received: false, error: 'Invalid project ID' }, { status: 422 });
  }
  if ((event !== 'brand_complete' || agent !== 'chatgpt') &&
      (event !== 'qa_complete' || agent !== 'browserworker')) {
    return NextResponse.json({
      received: false, error: 'Unsupported callback or untrusted agent role',
    }, { status: 422 });
  }

  try {
    if (event === 'qa_complete') {
      const total = body.qa_score;
      if (typeof total !== 'number' || !Number.isFinite(total) ||
          total < 0 || total > 100) {
        return NextResponse.json({ received: false, error: 'Invalid QA score' }, { status: 422 });
      }

      // Whitelist fields; arbitrary callback data may not override ship_it.
      const saved = await sbPost('uacs_qa_results', {
        project_id: projectId, total_score: Math.floor(total),
        pass1_code_quality: score(data.pass1_code_quality),
        pass2_visual_parity: score(data.pass2_visual_parity),
        pass3_functional: score(data.pass3_functional),
        pass4_performance: score(data.pass4_performance),
        preview_url: typeof data.preview_url === 'string' ? data.preview_url : null,
        issues: Array.isArray(data.issues) ? data.issues.slice(0, 20) : [],
        ship_it: false, tested_at: new Date().toISOString(),
      });
      if (!saved) throw new Error('QA record not persisted');
      const patched = await sbPatch('uacs_projects', projectId, {
        qa_score: Math.floor(total),
        faang_passed: false, status: 'validate',
        updated_at: new Date().toISOString(),
      });
      if (!patched) throw new Error('Project state not persisted');
      return NextResponse.json({
        received: true, release_authorized: false,
        validation_state: 'awaiting_independent_guardian',
      });
    }

    const label = data.option_label;
    if (typeof label !== 'string' || !label.trim() || label.length > 120) {
      return NextResponse.json({ received: false, error: 'Invalid brand option' }, { status: 422 });
    }
    const saved = await sbPost('uacs_brand_packages', {
      project_id: projectId, option_label: label,
      logo_url: typeof data.logo_url === 'string' ? data.logo_url : null,
      primary_color: typeof data.primary_color === 'string' ? data.primary_color : '#f8b800',
      secondary_color: typeof data.secondary_color === 'string' ? data.secondary_color : '#000000',
      approved: false,
    });
    if (!saved) throw new Error('Brand record not persisted');
    const patched = await sbPatch('uacs_projects', projectId, {
      status: 'visual_approval', updated_at: new Date().toISOString(),
    });
    if (!patched) throw new Error('Project state not persisted');
    return NextResponse.json({ received: true, approval_required: true });
  } catch {
    return NextResponse.json({
      received: false, error: 'Could not verify durable callback persistence',
    }, { status: 502 });
  }
}
