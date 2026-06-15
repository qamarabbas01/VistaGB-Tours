"use client";

import { FormEvent, useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
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
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
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
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
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
          className="rounded-lg border border-teal/30 bg-night px-4 py-3 text-glacier outline-none transition-colors focus:border-apricot"
          placeholder="Travel dates, group size, what you'd like to see..."
        />
      </div>

      <button
        type="submit"
        className="mt-2 w-full rounded-full bg-apricot px-8 py-3 text-sm font-semibold text-night transition-transform hover:scale-[1.02]"
      >
        Send Message
      </button>
    </form>
  );
}
