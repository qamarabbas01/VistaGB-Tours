import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  destination: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  // Replace with email delivery (Resend, SendGrid, etc.) or a CRM webhook.
  console.info("New contact inquiry:", inquiry);

  return NextResponse.json({ ok: true });
}
