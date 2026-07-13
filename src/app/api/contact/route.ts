import { contact } from "@/config/contact";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  destination: string;
  places: string;
  travelFrom: string;
  travelTo: string;
  datesFlexible: string;
  travelMonth: string;
  duration: string;
  groupSize: string;
  message: string;
};

const FIELD_LIMITS = {
  name: 120,
  email: 254,
  destination: 120,
  places: 500,
  travelFrom: 40,
  travelTo: 40,
  datesFlexible: 8,
  travelMonth: 40,
  duration: 40,
  groupSize: 20,
  message: 4000,
  website: 200, // honeypot
} as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatTravelDates(inquiry: ContactPayload) {
  if (inquiry.datesFlexible === "yes") {
    return inquiry.travelMonth
      ? `Flexible — hoping for ${inquiry.travelMonth}`
      : "Flexible dates";
  }

  if (inquiry.travelFrom && inquiry.travelTo) {
    return `${inquiry.travelFrom} to ${inquiry.travelTo}`;
  }

  if (inquiry.travelFrom) {
    return `From ${inquiry.travelFrom}`;
  }

  return "Not specified";
}

function buildEmailBody(inquiry: ContactPayload) {
  const lines = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Region: ${inquiry.destination}`,
    inquiry.places ? `Places: ${inquiry.places}` : null,
    `Travel dates: ${formatTravelDates(inquiry)}`,
    `Trip length: ${inquiry.duration}`,
    `Travelers: ${inquiry.groupSize}`,
    inquiry.message ? "" : null,
    inquiry.message ? inquiry.message : null,
  ].filter((line): line is string => line !== null);

  return lines.join("\n");
}

function buildEmailHtml(inquiry: ContactPayload) {
  const rows = [
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Region", inquiry.destination],
    inquiry.places ? ["Places", inquiry.places] : null,
    ["Travel dates", formatTravelDates(inquiry)],
    ["Trip length", inquiry.duration],
    ["Travelers", inquiry.groupSize],
  ].filter((row): row is [string, string] => row !== null);

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
    )
    .join("");

  const notes = inquiry.message
    ? `<p><strong>Additional notes:</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, "<br>")}</p>`
    : "";

  return `${tableRows}${notes}`;
}

function tooLong(value: string, max: number) {
  return value.length > max;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many inquiries from this network. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const {
    name,
    email,
    destination,
    places = "",
    travelFrom = "",
    travelTo = "",
    datesFlexible = "no",
    travelMonth = "",
    duration,
    groupSize,
    message = "",
    website = "",
  } = body as Partial<ContactPayload> & { website?: string };

  // Honeypot: bots fill this hidden field; humans never see it.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof destination !== "string" ||
    typeof duration !== "string" ||
    typeof groupSize !== "string" ||
    typeof places !== "string" ||
    typeof travelFrom !== "string" ||
    typeof travelTo !== "string" ||
    typeof datesFlexible !== "string" ||
    typeof travelMonth !== "string" ||
    typeof message !== "string"
  ) {
    return NextResponse.json(
      { error: "Invalid input: all fields must be text." },
      { status: 400 },
    );
  }

  if (
    tooLong(name, FIELD_LIMITS.name) ||
    tooLong(email, FIELD_LIMITS.email) ||
    tooLong(destination, FIELD_LIMITS.destination) ||
    tooLong(places, FIELD_LIMITS.places) ||
    tooLong(travelFrom, FIELD_LIMITS.travelFrom) ||
    tooLong(travelTo, FIELD_LIMITS.travelTo) ||
    tooLong(datesFlexible, FIELD_LIMITS.datesFlexible) ||
    tooLong(travelMonth, FIELD_LIMITS.travelMonth) ||
    tooLong(duration, FIELD_LIMITS.duration) ||
    tooLong(groupSize, FIELD_LIMITS.groupSize) ||
    tooLong(message, FIELD_LIMITS.message)
  ) {
    return NextResponse.json(
      { error: "One or more fields are too long." },
      { status: 400 },
    );
  }

  if (!name.trim() || !email.trim() || !destination.trim() || !duration.trim() || !groupSize.trim()) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 },
    );
  }

  if (datesFlexible !== "yes" && !travelFrom.trim()) {
    return NextResponse.json(
      { error: "Please choose when you want to travel." },
      { status: 400 },
    );
  }

  if (datesFlexible === "yes" && !travelMonth.trim()) {
    return NextResponse.json(
      { error: "Please choose the month you are hoping to travel." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  }

  const inquiry: ContactPayload = {
    name: name.trim(),
    email: email.trim(),
    destination: destination.trim(),
    places: places.trim(),
    travelFrom: travelFrom.trim(),
    travelTo: travelTo.trim(),
    datesFlexible,
    travelMonth: travelMonth.trim(),
    duration: duration.trim(),
    groupSize: groupSize.trim(),
    message: message.trim(),
  };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_EMAIL_TO ?? contact.email;

  if (!apiKey || !from) {
    console.error(
      "Contact email is not configured (set RESEND_API_KEY and RESEND_FROM_EMAIL).",
    );
    return NextResponse.json(
      {
        error:
          "Unable to send your message right now. Please try again later or email us directly.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: inquiry.email,
    subject: `New inquiry: ${inquiry.destination} · ${inquiry.duration} — ${inquiry.name}`,
    text: buildEmailBody(inquiry),
    html: buildEmailHtml(inquiry),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      {
        error:
          "Unable to send your message right now. Please try again later or email us directly.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
