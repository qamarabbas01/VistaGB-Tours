import { contact } from '@/config/contact';
import {
  CONTACT_EMAIL_LIMIT,
  CONTACT_EMAIL_WINDOW_MS,
  CONTACT_FLOOD_LIMIT,
  CONTACT_FLOOD_WINDOW_MS,
  CONTACT_MAX_BODY_BYTES,
  CONTACT_SEND_LIMIT,
  CONTACT_SEND_WINDOW_MS,
  contactTokenError,
  declaredBodyTooLarge,
  hasTrustedContactMetadata,
  isHoneypotTripped,
  verifyContactFormToken,
} from '@/lib/contact/form-guard';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { getContactFormSecret, getContactMailEnv } from '@/lib/server-env';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

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
} as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatTravelDates(inquiry: ContactPayload) {
  if (inquiry.datesFlexible === 'yes') {
    return inquiry.travelMonth
      ? `Flexible — hoping for ${inquiry.travelMonth}`
      : 'Flexible dates';
  }

  if (inquiry.travelFrom && inquiry.travelTo) {
    return `${inquiry.travelFrom} to ${inquiry.travelTo}`;
  }

  if (inquiry.travelFrom) {
    return `From ${inquiry.travelFrom}`;
  }

  return 'Not specified';
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
    inquiry.message ? '' : null,
    inquiry.message ? inquiry.message : null,
  ].filter((line): line is string => line !== null);

  return lines.join('\n');
}

function buildEmailHtml(inquiry: ContactPayload) {
  const rows = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Region', inquiry.destination],
    inquiry.places ? ['Places', inquiry.places] : null,
    ['Travel dates', formatTravelDates(inquiry)],
    ['Trip length', inquiry.duration],
    ['Travelers', inquiry.groupSize],
  ].filter((row): row is [string, string] => row !== null);

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`,
    )
    .join('');

  const notes = inquiry.message
    ? `<p><strong>Additional notes:</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, '<br>')}</p>`
    : '';

  return `${tableRows}${notes}`;
}

function tooLong(value: string, max: number) {
  return value.length > max;
}

function tooManyRequests(retryAfterSec: number) {
  return NextResponse.json(
    {
      error: 'Too many inquiries from this network. Please try again later.',
    },
    {
      status: 429,
      headers: { 'Retry-After': String(retryAfterSec) },
    },
  );
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const flooded = rateLimit(`contact:flood:${ip}`, {
    limit: CONTACT_FLOOD_LIMIT,
    windowMs: CONTACT_FLOOD_WINDOW_MS,
  });
  if (!flooded.ok) {
    return tooManyRequests(flooded.retryAfterSec);
  }

  if (declaredBodyTooLarge(request)) {
    return NextResponse.json(
      { error: 'Request body is too large.' },
      { status: 413 },
    );
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  if (Buffer.byteLength(raw, 'utf8') > CONTACT_MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: 'Request body is too large.' },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(raw) as unknown;
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 },
    );
  }

  const record = body as Partial<ContactPayload> & {
    website?: unknown;
    formToken?: unknown;
  };

  if (isHoneypotTripped(record.website)) {
    console.warn(`[contact] honeypot tripped from ${ip}`);
    return NextResponse.json({ ok: true });
  }

  if (!hasTrustedContactMetadata(request)) {
    console.warn(`[contact] rejected untrusted request metadata from ${ip}`);
    return NextResponse.json(
      {
        error: 'Please use the contact form on this site to send your inquiry.',
      },
      { status: 400 },
    );
  }

  const secret = getContactFormSecret();
  if (!secret) {
    console.error(
      'Contact form signing secret is not configured (set CONTACT_FORM_SECRET or RESEND_API_KEY).',
    );
    return NextResponse.json(
      {
        error:
          'Unable to send your message right now. Please try again later or email us directly.',
      },
      { status: 503 },
    );
  }

  const token = verifyContactFormToken(record.formToken, secret);
  if (!token.ok) {
    console.warn(`[contact] rejected form token from ${ip} (${token.reason})`);
    return NextResponse.json(
      { error: contactTokenError(token.reason) },
      { status: 400 },
    );
  }

  const {
    name,
    email,
    destination,
    places = '',
    travelFrom = '',
    travelTo = '',
    datesFlexible = 'no',
    travelMonth = '',
    duration,
    groupSize,
    message = '',
  } = record;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof destination !== 'string' ||
    typeof duration !== 'string' ||
    typeof groupSize !== 'string' ||
    typeof places !== 'string' ||
    typeof travelFrom !== 'string' ||
    typeof travelTo !== 'string' ||
    typeof datesFlexible !== 'string' ||
    typeof travelMonth !== 'string' ||
    typeof message !== 'string'
  ) {
    return NextResponse.json(
      { error: 'Invalid input: all fields must be text.' },
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
      { error: 'One or more fields are too long.' },
      { status: 400 },
    );
  }

  if (
    !name.trim() ||
    !email.trim() ||
    !destination.trim() ||
    !duration.trim() ||
    !groupSize.trim()
  ) {
    return NextResponse.json(
      { error: 'Please fill in all required fields.' },
      { status: 400 },
    );
  }

  if (datesFlexible !== 'yes' && !travelFrom.trim()) {
    return NextResponse.json(
      { error: 'Please choose when you want to travel.' },
      { status: 400 },
    );
  }

  if (datesFlexible === 'yes' && !travelMonth.trim()) {
    return NextResponse.json(
      { error: 'Please choose the month you are hoping to travel.' },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { error: 'Please provide a valid email address.' },
      { status: 400 },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();
  const inquiry: ContactPayload = {
    name: name.trim(),
    email: normalizedEmail,
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

  const mail = getContactMailEnv();
  const apiKey = mail.apiKey;
  const from = mail.from;
  const to = mail.to || contact.email;

  if (!apiKey || !from || !to) {
    console.error(
      'Contact email is not configured (set RESEND_API_KEY, RESEND_FROM_EMAIL, and CONTACT_EMAIL_TO or NEXT_PUBLIC_CONTACT_EMAIL).',
    );
    return NextResponse.json(
      {
        error:
          'Unable to send your message right now. Please try again later or email us directly.',
      },
      { status: 503 },
    );
  }

  const sendLimited = rateLimit(`contact:send:${ip}`, {
    limit: CONTACT_SEND_LIMIT,
    windowMs: CONTACT_SEND_WINDOW_MS,
  });
  if (!sendLimited.ok) {
    return tooManyRequests(sendLimited.retryAfterSec);
  }

  const emailLimited = rateLimit(`contact:email:${normalizedEmail}`, {
    limit: CONTACT_EMAIL_LIMIT,
    windowMs: CONTACT_EMAIL_WINDOW_MS,
  });
  if (!emailLimited.ok) {
    return tooManyRequests(emailLimited.retryAfterSec);
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
    console.error('Resend error:', error);
    return NextResponse.json(
      {
        error:
          'Unable to send your message right now. Please try again later or email us directly.',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
