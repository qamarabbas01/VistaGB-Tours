import { NextResponse } from "next/server";
import { answerLocally } from "@/lib/assistant/local";
import {
  streamOpenAIAnswer,
  textStreamFromString,
} from "@/lib/assistant/openai";
import { buildTravelContext } from "@/lib/assistant/retrieve";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

type Body = {
  messages?: IncomingMessage[];
  destinationSlug?: string;
};

const MAX_MESSAGE_LENGTH = 2000;
const MAX_HISTORY = 12;

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`assistant:${ip}`, {
    limit: 20,
    windowMs: 60 * 1000,
  });

  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return NextResponse.json(
      { error: "messages array is required" },
      { status: 400 },
    );
  }

  if (messages.length > MAX_HISTORY) {
    return NextResponse.json(
      { error: "Conversation is too long. Start a new chat." },
      { status: 400 },
    );
  }

  for (const message of messages) {
    if (
      !message ||
      (message.role !== "user" && message.role !== "assistant") ||
      typeof message.content !== "string"
    ) {
      return NextResponse.json({ error: "Invalid message shape" }, { status: 400 });
    }
    if (message.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }
  }

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser?.content.trim()) {
    return NextResponse.json(
      { error: "A user message is required" },
      { status: 400 },
    );
  }

  const destinationSlug =
    typeof body.destinationSlug === "string" &&
    /^[a-z0-9-]{1,80}$/i.test(body.destinationSlug)
      ? body.destinationSlug
      : undefined;

  const query = lastUser.content.trim();
  const context = await buildTravelContext(query, destinationSlug);
  const apiKey = process.env.OPENAI_API_KEY?.trim();

  try {
    if (apiKey) {
      const history = messages.slice(0, -1).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const stream = await streamOpenAIAnswer({
        apiKey,
        context,
        userMessage: query,
        history,
      });
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-VistaGB-Assistant": "openai",
        },
      });
    }

    const local = answerLocally(context);
    return new Response(textStreamFromString(local), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-VistaGB-Assistant": "local",
      },
    });
  } catch (error) {
    // Fall back to grounded local answers if the LLM fails
    try {
      const local = answerLocally(context);
      return new Response(textStreamFromString(local), {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "X-VistaGB-Assistant": "local-fallback",
        },
      });
    } catch {
      const message =
        error instanceof Error ? error.message : "Assistant failed";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }
}
