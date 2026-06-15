"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-teal/20 bg-slate p-8 text-center">
        <p className="coord-label mb-3">Message Sent</p>
        <p className="text-glacier">
          Thank you — we&apos;ll reply within 24 hours with a route and quote.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="coord-label">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          disabled={submitting}
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60"
          placeholder="Your name"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="coord-label">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          disabled={submitting}
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="destination" className="coord-label">
          Interested In
        </label>
        <select
          id="destination"
          name="destination"
          disabled={submitting}
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60"
        >
          <option>Hunza Valley</option>
          <option>Skardu</option>
          <option>Deosai Plains</option>
          <option>Fairy Meadows</option>
          <option>Khaplu</option>
          <option>Attabad Lake</option>
          <option>Not sure yet — help me decide</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="coord-label">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          disabled={submitting}
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot disabled:opacity-60"
          placeholder="Travel dates, group size, what you'd like to see..."
        />
      </div>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 w-full rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
