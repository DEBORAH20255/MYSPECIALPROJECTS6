import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { getSession } from '@/lib/redis-client';

export async function middleware(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next();
  
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Handle CORS for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers: response.headers });
    }
  }

  // Protected routes that require authentication
  const protectedPaths = ['/api/users'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    let isAuthenticated = false;

    // Try session-based auth first (for custom login)
    const sessionToken = request.cookies.get('session')?.value;
    if (sessionToken) {
      try {
        const email = await getSession(sessionToken);
        if (email) {
          isAuthenticated = true;
        }
      } catch (error) {
        console.error('Session verification failed:', error);
      }
    }

    // Fallback to JWT-based auth
    if (!isAuthenticated) {
      const jwtToken = request.cookies.get('token')?.value;
      if (jwtToken) {
        try {
          await verifyToken(jwtToken);
          isAuthenticated = true;
        } catch (error) {
          console.error('JWT verification failed:', error);
        }
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'],
};