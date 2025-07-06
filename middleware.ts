import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirect /dashboard to /
  if (request.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  // Allow all other requests
  return NextResponse.next();
}

// Optionally, limit middleware to only relevant paths for performance
export const config = {
  matcher: ['/dashboard'],
};