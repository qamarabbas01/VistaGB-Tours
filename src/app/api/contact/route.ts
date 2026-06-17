import { contact } from "@/config/contact";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactPayload = {
  name: string;
  email: string;
  destination: string;
  message: string;
};

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

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const { name, email, destination, message } = body as Partial<ContactPayload>;

  if (!name?.trim() || !email?.trim() || !destination?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "All fields are required." },
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
    subject: `New inquiry: ${inquiry.destination} — ${inquiry.name}`,
    text: [
      `Name: ${inquiry.name}`,
      `Email: ${inquiry.email}`,
      `Interested in: ${inquiry.destination}`,
      "",
      inquiry.message,
    ].join("\n"),
    html: `
      <p><strong>Name:</strong> ${escapeHtml(inquiry.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>
      <p><strong>Interested in:</strong> ${escapeHtml(inquiry.destination)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(inquiry.message).replace(/\n/g, "<br>")}</p>
    `,
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
