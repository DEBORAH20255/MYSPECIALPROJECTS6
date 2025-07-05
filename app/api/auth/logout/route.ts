import { NextRequest, NextResponse } from 'next/server';
import { deleteSession } from '@/lib/redis-client';

export async function POST(request: NextRequest) {
  try {
    // Get session token from cookie
    const sessionToken = request.cookies.get('session')?.value;

    if (sessionToken) {
      // Delete session from Redis
      await deleteSession(sessionToken);
    }

    // Create response and clear the session cookie
    const response = NextResponse.json(
      { message: 'Logout successful' },
      { status: 200 }
    );

    // Clear the session cookie
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0, // Expire immediately
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}