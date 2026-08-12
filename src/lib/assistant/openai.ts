import { generalKnowledgeFor } from "@/lib/assistant/knowledge";
import {
  formatContextForPrompt,
  type TravelContext,
} from "@/lib/assistant/retrieve";

export const ASSISTANT_SYSTEM_PROMPT = `You are VistaGB Tours' AI Travel Assistant for Gilgit-Baltistan, Pakistan.

Voice: warm, practical, concise — like a knowledgeable local trip designer. Use short paragraphs and bullet lists. No emoji spam.

Rules:
1. Ground answers in the DESTINATION CONTEXT and GENERAL KNOWLEDGE provided. Prefer that over generic world knowledge.
2. If live weather is in context, use those numbers for current conditions and forecast.
3. For hotels, food, itineraries, FAQs, and nearby places — use the guide listings. Do not invent specific hotel names that are not in context.
4. For budget, roads, and packing — use the provided general knowledge and adapt to the destination.
5. If context is thin, say what you do know and suggest the traveller name a valley (Hunza, Skardu, Gilgit, Nagar, Khaplu, Astore, Fairy Meadows, etc.) or contact VistaGB.
6. End actionable trip-planning answers with a soft handoff: they can continue at /contact for a private custom itinerary.
7. Link destinations as /destinations/{slug} when helpful.
8. Never claim to book lodges or jeeps in-chat — VistaGB handles that via Contact.
9. Stay on Gilgit-Baltistan travel. Politely refuse unrelated topics.`;

export function buildUserPrompt(
  ctx: TravelContext,
  userMessage: string,
): string {
  const general = generalKnowledgeFor(
    ctx.generalTopics.length
      ? ctx.generalTopics
      : ctx.intent === "budget"
        ? ["budget"]
        : ctx.intent === "roads"
          ? ["roads"]
          : ctx.intent === "packing"
            ? ["packing"]
            : [],
  );

  return [
    "DESTINATION CONTEXT:",
    formatContextForPrompt(ctx) || "(no specific destination matched)",
    general ? `\nGENERAL KNOWLEDGE:\n${general}` : "",
    `\nTRAVELLER QUESTION:\n${userMessage}`,
  ]
    .filter(Boolean)
    .join("\n");
}

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

export async function streamOpenAIAnswer(options: {
  apiKey: string;
  context: TravelContext;
  userMessage: string;
  history?: ChatMessage[];
}): Promise<ReadableStream<Uint8Array>> {
  const { apiKey, context, userMessage, history = [] } = options;

  const messages: ChatMessage[] = [
    { role: "system", content: ASSISTANT_SYSTEM_PROMPT },
    ...history.slice(-8).filter((m) => m.role !== "system"),
    { role: "user", content: buildUserPrompt(context, userMessage) },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      stream: true,
      messages,
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `OpenAI error ${response.status}${detail ? `: ${detail.slice(0, 200)}` : ""}`,
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") {
              controller.close();
              return;
            }
            try {
              const json = JSON.parse(data) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const token = json.choices?.[0]?.delta?.content;
              if (token) controller.enqueue(encoder.encode(token));
            } catch {
              // skip malformed chunks
            }
          }
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
    cancel() {
      void reader.cancel();
    },
  });
}

export function textStreamFromString(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}
