import { NextResponse } from 'next/server';
import {
  ASSISTANT_MAX_BODY_BYTES,
  ASSISTANT_MAX_JSON_DEPTH,
  ASSISTANT_OVERSIZE_LIMIT,
  ASSISTANT_OVERSIZE_WINDOW_MS,
  PayloadTooLargeError,
  jsonNestingDepth,
  oversizedContentLength,
  readBodyLimited,
} from '@/lib/assistant/body-limits';
import { answerLocally } from '@/lib/assistant/local';
import {
  streamOpenAIAnswer,
  textStreamFromString,
} from '@/lib/assistant/openai';
import { buildTravelContext } from '@/lib/assistant/retrieve';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { getAssistantEnv } from '@/lib/server-env';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type IncomingMessage = {
  role: 'user' | 'assistant';
  content: string;
};

type Body = {
  messages?: IncomingMessage[];
  destinationSlug?: string;
};

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 12;

function rejectOversized(ip: string, bytes: number) {
  console.warn(
    `[assistant] rejected oversized payload from ${ip} (${bytes} bytes)`,
  );

  const limited = rateLimit(`assistant:oversize:${ip}`, {
    limit: ASSISTANT_OVERSIZE_LIMIT,
    windowMs: ASSISTANT_OVERSIZE_WINDOW_MS,
  });

  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many oversized requests. Please try again shortly.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      },
    );
  }

  return NextResponse.json(
    { error: 'Request body is too large.' },
    { status: 413 },
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`assistant:${ip}`, {
    limit: 20,
    windowMs: 60 * 1000,
  });

  if (!limited.ok) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      {
        status: 429,
        headers: { 'Retry-After': String(limited.retryAfterSec) },
      },
    );
  }

  const declaredBytes = oversizedContentLength(
    request,
    ASSISTANT_MAX_BODY_BYTES,
  );
  if (declaredBytes !== null) {
    return rejectOversized(ip, declaredBytes);
  }

  let raw: string;
  try {
    raw = await readBodyLimited(request, ASSISTANT_MAX_BODY_BYTES);
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return rejectOversized(ip, error.bytes);
    }
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (jsonNestingDepth(raw) > ASSISTANT_MAX_JSON_DEPTH) {
    return NextResponse.json(
      { error: 'Request payload is too deeply nested.' },
      { status: 400 },
    );
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return NextResponse.json(
      { error: 'messages array is required' },
      { status: 400 },
    );
  }

  const body = parsed as Body;
  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json(
      { error: 'messages array is required' },
      { status: 400 },
    );
  }

  if (messages.length > MAX_HISTORY) {
    return NextResponse.json(
      { error: 'Conversation is too long. Start a new chat.' },
      { status: 400 },
    );
  }

  for (const message of messages) {
    if (
      !message ||
      (message.role !== 'user' && message.role !== 'assistant') ||
      typeof message.content !== 'string'
    ) {
      return NextResponse.json(
        { error: 'Invalid message shape' },
        { status: 400 },
      );
    }
    if (message.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: 'Message is too long.' },
        { status: 400 },
      );
    }
  }

  const lastUser = [...messages].reverse().find((m) => m.role === 'user');
  if (!lastUser?.content.trim()) {
    return NextResponse.json(
      { error: 'A user message is required' },
      { status: 400 },
    );
  }

  const destinationSlug =
    typeof body.destinationSlug === 'string' &&
    /^[a-z0-9-]{1,80}$/i.test(body.destinationSlug)
      ? body.destinationSlug
      : undefined;

  const query = lastUser.content.trim();
  const context = await buildTravelContext(query, destinationSlug);
  const { apiKey, model } = getAssistantEnv();

  try {
    if (apiKey) {
      const history = messages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const stream = await streamOpenAIAnswer({
        apiKey,
        model,
        context,
        userMessage: query,
        history,
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-VistaGB-Assistant': 'openai',
        },
      });
    }

    const local = answerLocally(context);
    return new Response(textStreamFromString(local), {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-VistaGB-Assistant': 'local',
      },
    });
  } catch (error) {
    try {
      const local = answerLocally(context);
      return new Response(textStreamFromString(local), {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-VistaGB-Assistant': 'local-fallback',
        },
      });
    } catch {
      const message =
        error instanceof Error ? error.message : 'Assistant failed';
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }
}
