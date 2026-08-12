"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const SUGGESTIONS = [
  "Tell me about Hunza",
  "5-day itinerary for Skardu",
  "Best hotels in Hunza",
  "Famous food in Gilgit",
  "Best time to visit Nagar",
  "Weather in Hunza",
  "Budget for a week in GB",
  "Road conditions to Hunza",
  "Packing list for Deosai",
  "Nearby destinations from Skardu",
] as const;

type Props = {
  destinationSlug?: string;
  destinationName?: string;
};

function newId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function TravelAssistant({
  destinationSlug,
  destinationName,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function sendMessage(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");

    const userMessage: ChatMessage = {
      id: newId(),
      role: "user",
      content: text,
    };
    const assistantId = newId();
    const historyForApi = [...messages, userMessage].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: historyForApi,
          destinationSlug,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(payload?.error || "Assistant is unavailable right now");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response stream");

      const decoder = new TextDecoder();
      let assembled = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assembled += decoder.decode(value, { stream: true });
        const snapshot = assembled;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: snapshot } : m,
          ),
        );
      }

      if (!assembled.trim()) {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "I couldn't form an answer just now. Try another question, or reach us via Contact.",
                }
              : m,
          ),
        );
      }
    } catch (err) {
      if (controller.signal.aborted) return;
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setMessages((prev) =>
        prev.filter((m) => m.id !== assistantId || m.content.trim()),
      );
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  const showSuggestions = messages.length === 0 && !loading;

  return (
    <div className="flex min-h-[70vh] flex-col overflow-hidden rounded-3xl border border-teal/25 bg-slate shadow-2xl shadow-black/20">
      <div className="border-b border-teal/20 px-5 py-4 md:px-6">
        <p className="coord-label mb-1">AI Travel Assistant</p>
        <h2 className="font-display text-xl font-semibold text-glacier md:text-2xl">
          Plan Gilgit-Baltistan with VistaGB
        </h2>
        <p className="mt-1 text-sm text-ice">
          Ask about valleys, itineraries, hotels, food, weather, roads, packing,
          and budgets
          {destinationName ? (
            <>
              {" "}
              — currently focused on{" "}
              <span className="text-apricot">{destinationName}</span>
            </>
          ) : null}
          .
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 md:px-6">
        {showSuggestions ? (
          <div className="mx-auto max-w-2xl py-6 text-center">
            <p className="text-sm leading-relaxed text-ice">
              Grounded in VistaGB destination guides
              {destinationName ? ` and ${destinationName}` : ""}. Live weather
              pulls in when you ask.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => void sendMessage(suggestion)}
                  className="rounded-full border border-teal/30 bg-night/40 px-3.5 py-2 text-left text-xs text-ice transition-colors hover:border-apricot/60 hover:text-apricot md:text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed md:max-w-[80%] ${
                message.role === "user"
                  ? "bg-apricot text-night"
                  : "border border-teal/25 bg-night/50 text-glacier"
              }`}
            >
              {message.role === "assistant" && !message.content ? (
                <span className="inline-flex items-center gap-1 text-ice">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-apricot" />
                  Thinking…
                </span>
              ) : (
                <p className="whitespace-pre-wrap">{message.content}</p>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="border-t border-teal/20 px-5 py-4 md:px-6">
        {error ? (
          <p className="mb-3 text-sm text-apricot" role="alert">
            {error}
          </p>
        ) : null}
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 rounded-2xl border border-teal/30 bg-night/60 p-2 focus-within:border-apricot/70 sm:flex-row"
        >
          <label htmlFor="assistant-input" className="sr-only">
            Ask the travel assistant
          </label>
          <input
            id="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            maxLength={2000}
            disabled={loading}
            placeholder="Ask about Hunza, weather, hotels, packing…"
            className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-glacier outline-none placeholder:text-ice/50 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-apricot px-6 py-3 text-sm font-semibold text-night transition-colors hover:bg-glacier disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "…" : "Ask"}
          </button>
        </form>
        <p className="mt-3 text-xs text-ice/60">
          Planning a private trip?{" "}
          <Link href="/contact" className="text-apricot hover:underline">
            Contact VistaGB
          </Link>{" "}
          for a custom quote.
        </p>
      </div>
    </div>
  );
}
