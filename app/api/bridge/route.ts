import { NextRequest, NextResponse } from 'next/server';
import { requireServerToken } from '@/lib/server/require-token';

// This adapter acknowledges transport acceptance, not build completion.
// APEX is not routed until an authenticated, receipt-producing X1 executor exists.
export async function GET() {
  return NextResponse.json({
    system: 'UACS bridge',
    status: 'unverified',
    execution_verified: false,
    supported_transports: ['chatgpt', 'browserworker'],
    apex_executor_connected: false,
  });
}

export async function POST(request: NextRequest) {
  const denied = requireServerToken(request, 'BRIDGE_SHARED_SECRET');
  if (denied) return denied;

  const dbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const dbKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!dbUrl?.startsWith('https://') || !dbKey) {
    return NextResponse.json({ success: false, error: 'Durable receipt storage unavailable' }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    const input: unknown = await request.json();
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid body');
    body = input as Record<string, unknown>;
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON object' }, { status: 400 });
  }

  const agent = body.agent;
  const projectId = body.project_id;
  const type = body.type;
  if (typeof projectId !== 'string' || !/^[a-f0-9-]{36}$/i.test(projectId) ||
      typeof type !== 'string' || !/^[a-z][a-z0-9_-]{0,79}$/i.test(type)) {
    return NextResponse.json({ success: false, error: 'Invalid project_id or type' }, { status: 422 });
  }
  if (agent !== 'chatgpt' && agent !== 'browserworker') {
    return NextResponse.json({
      success: false, execution_verified: false,
      error: 'No verified X1/APEX executor is connected; job was not dispatched',
    }, { status: 503 });
  }

  const target = agent === 'chatgpt'
    ? process.env.CHATGPT_BRIDGE_URL?.trim()
    : process.env.BROWSERWORKER_URL?.trim();
  const token = agent === 'chatgpt'
    ? process.env.BRIDGE_SHARED_SECRET?.trim()
    : process.env.BROWSERWORKER_SECRET?.trim();
  if (!target?.startsWith('https://') || !token) {
    return NextResponse.json({
      success: false, execution_verified: false,
      error: 'Requested provider adapter is not configured',
    }, { status: 503 });
  }

  try {
    // Never dispatch without a durable receipt for this attempt.
    const persisted = await fetch(dbUrl + '/rest/v1/uacs_build_log', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + dbKey,
        apikey: dbKey,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        project_id: projectId, phase: type, agent,
        action: 'bridge_' + type, status: 'dispatch_requested',
        details: { priority: body.priority ?? null, provider: agent },
        logged_at: new Date().toISOString(),
      }),
    });
    const receipts: unknown = persisted.ok ? await persisted.json() : null;
    if (!Array.isArray(receipts) || !receipts[0]?.id) {
      return NextResponse.json({ success: false, error: 'Failed to persist dispatch receipt' }, { status: 502 });
    }

    const response = await fetch(target.replace(/\/$/, '') +
      (agent === 'chatgpt' ? '/api/jobs' : '/api/run'), {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
      body: JSON.stringify(agent === 'chatgpt'
        ? { type, project_id: projectId, project_name: body.project_name, payload: body.payload }
        : body.payload),
    });
    if (!response.ok) {
      return NextResponse.json({
        success: false, error: 'Provider rejected dispatch',
        dispatch_log_id: receipts[0].id, provider_status: response.status,
      }, { status: 502 });
    }
    const result: unknown = await response.json().catch(() => null);
    if (!result || typeof result !== 'object' || Array.isArray(result) ||
        (result as { success?: boolean }).success === false) {
      return NextResponse.json({
        success: false, error: 'Provider returned no valid acceptance receipt',
        dispatch_log_id: receipts[0].id,
      }, { status: 502 });
    }
    const provider = result as { id?: unknown; task_id?: unknown; job_id?: unknown };
    const reference = [provider.task_id, provider.job_id, provider.id]
      .find((value) => typeof value === 'string') ?? null;
    return NextResponse.json({
      success: true, agent, dispatch_accepted: true,
      execution_verified: false, dispatch_log_id: receipts[0].id,
      provider_reference: reference,
    });
  } catch {
    return NextResponse.json({
      success: false, error: 'Dispatch or receipt service unavailable',
      execution_verified: false,
    }, { status: 502 });
  }
}
