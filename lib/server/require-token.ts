import { timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Server-to-server authentication. Missing configuration is never an allow rule.
export function requireServerToken(
  request: NextRequest,
  secretName: 'BRIDGE_SHARED_SECRET' | 'UACS_OPERATOR_TOKEN',
): NextResponse | null {
  const secret = process.env[secretName]?.trim();
  if (!secret) {
    return NextResponse.json(
      { success: false, error: 'Server authorization is not configured' },
      { status: 503 },
    );
  }

  const header = request.headers.get('authorization') ?? '';
  if (!header.startsWith('Bearer ')) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const supplied = Buffer.from(header.slice('Bearer '.length), 'utf8');
  const expected = Buffer.from(secret, 'utf8');
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
