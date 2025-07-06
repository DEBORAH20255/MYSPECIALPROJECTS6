// Mark route as dynamic to support reading cookies (required by Next.js)
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/redis-client';

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'No session token provided' },
        { status: 401 }
      );
    }

    const email = await getSession(sessionToken);

    if (!email) {
      return NextResponse.json(
        { error: 'Invalid or expired session' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: { email, sessionToken },
      authenticated: true,
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
