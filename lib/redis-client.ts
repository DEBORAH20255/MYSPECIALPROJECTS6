import { Redis } from '@upstash/redis';

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('Redis configuration missing. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
    }

    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
  }

  return redis;
}

export async function setSession(sessionToken: string, email: string, expirationSeconds: number = 60 * 60 * 24 * 30) {
  const redis = getRedisClient();
  await redis.set(`session:${sessionToken}`, email, 'EX', expirationSeconds);
}

export async function getSession(sessionToken: string): Promise<string | null> {
  const redis = getRedisClient();
  return await redis.get(`session:${sessionToken}`);
}

export async function deleteSession(sessionToken: string): Promise<void> {
  const redis = getRedisClient();
  await redis.del(`session:${sessionToken}`);
}

export async function extendSession(sessionToken: string, expirationSeconds: number = 60 * 60 * 24 * 30): Promise<void> {
  const redis = getRedisClient();
  await redis.expire(`session:${sessionToken}`, expirationSeconds);
}