import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }
  return redis;
}

// Helper function to generate session key
export function getSessionKey(sessionToken: string): string {
  return `session:${sessionToken}`;
}

// Set session with expiration
export async function setSession(sessionToken: string, email: string, expirationSeconds: number = 60 * 60 * 24 * 30) {
  const redis = getRedisClient();
  await redis.set(`session:${sessionToken}`, email, { ex: expirationSeconds });
}

export async function getSession(sessionToken: string): Promise<string | null> {
  const redis = getRedisClient();
  return await redis.get(`session:${sessionToken}`);
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const redis = getRedisClient();
  await redis.del(`session:${sessionToken}`);
}

// Helper function to normalize email
export function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}