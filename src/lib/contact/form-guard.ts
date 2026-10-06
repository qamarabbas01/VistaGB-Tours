import 'server-only';

import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { getContactFormSecret } from '@/lib/server-env';

/** Enough for a real inquiry, small enough to reject padded bot payloads. */
export const CONTACT_MAX_BODY_BYTES = 32 * 1024;

/** Instant script posts fail; a person filling the form is past this. */
export const CONTACT_MIN_AGE_MS = 2_000;
export const CONTACT_MAX_AGE_MS = 2 * 60 * 60 * 1000;

export const CONTACT_FLOOD_LIMIT = 8;
export const CONTACT_FLOOD_WINDOW_MS = 10 * 60 * 1000;
export const CONTACT_SEND_LIMIT = 3;
export const CONTACT_SEND_WINDOW_MS = 60 * 60 * 1000;
export const CONTACT_EMAIL_LIMIT = 3;
export const CONTACT_EMAIL_WINDOW_MS = 24 * 60 * 60 * 1000;

const TOKEN_MAX_LENGTH = 512;

export type TokenFailure = 'missing' | 'invalid' | 'too-fast' | 'expired';

export function issueContactFormToken(
  options: { secret?: string; now?: number } = {},
): string {
  const secret = options.secret ?? getContactFormSecret();
  if (!secret) return '';

  const payload = Buffer.from(
    JSON.stringify({
      iat: options.now ?? Date.now(),
      n: randomBytes(8).toString('hex'),
    }),
  ).toString('base64url');
  const signature = sign(payload, secret);
  return `${payload}.${signature}`;
}

export function verifyContactFormToken(
  token: unknown,
  secret: string,
  now = Date.now(),
): { ok: true } | { ok: false; reason: TokenFailure } {
  if (typeof token !== 'string' || token.length === 0) {
    return { ok: false, reason: 'missing' };
  }
  if (!secret || token.length > TOKEN_MAX_LENGTH) {
    return { ok: false, reason: 'invalid' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) return { ok: false, reason: 'invalid' };

  const [payload, signature] = parts;
  if (!payload || !signature) return { ok: false, reason: 'invalid' };

  const expected = sign(payload, secret);
  const actualBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expected);
  if (
    actualBuf.length !== expectedBuf.length ||
    !timingSafeEqual(actualBuf, expectedBuf)
  ) {
    return { ok: false, reason: 'invalid' };
  }

  let issuedAt: unknown;
  try {
    const parsed = JSON.parse(
      Buffer.from(payload, 'base64url').toString('utf8'),
    ) as { iat?: unknown };
    issuedAt = parsed.iat;
  } catch {
    return { ok: false, reason: 'invalid' };
  }

  if (typeof issuedAt !== 'number' || !Number.isFinite(issuedAt)) {
    return { ok: false, reason: 'invalid' };
  }

  const age = now - issuedAt;
  if (age < CONTACT_MIN_AGE_MS) return { ok: false, reason: 'too-fast' };
  if (age > CONTACT_MAX_AGE_MS) return { ok: false, reason: 'expired' };
  return { ok: true };
}

export function contactTokenError(reason: TokenFailure): string {
  if (reason === 'too-fast') {
    return 'Please wait a moment and try sending again.';
  }
  if (reason === 'expired') {
    return 'This form has expired. Refresh the page and try again.';
  }
  return 'Please use the contact form on this site to send your inquiry.';
}

/**
 * The hidden website field is a signal, not the only control.
 * A missing field is not proof of a human — non-strings and filled values are.
 */
export function isHoneypotTripped(website: unknown): boolean {
  if (website === undefined || website === null) return false;
  if (typeof website !== 'string') return true;
  return website.trim() !== '';
}

export function hasTrustedContactMetadata(request: Request): boolean {
  const contentType = request.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.includes('application/json')) return false;

  const userAgent = request.headers.get('user-agent')?.trim() ?? '';
  if (userAgent.length < 10) return false;

  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  if (!origin && !referer) return false;
  if (origin && !originAllowed(origin, request)) return false;
  if (!origin && referer && !originAllowed(referer, request)) return false;
  return true;
}

export function declaredBodyTooLarge(
  request: Request,
  maxBytes = CONTACT_MAX_BODY_BYTES,
): boolean {
  const header = request.headers.get('content-length');
  if (header === null) return false;
  const trimmed = header.trim();
  if (!/^\d+$/.test(trimmed)) return false;
  if (trimmed.length > 15) return true;
  const bytes = Number(trimmed);
  return !Number.isFinite(bytes) || bytes > maxBytes;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url');
}

function originAllowed(value: string, request: Request): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }

  const forwarded = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const headerHost = request.headers.get('host')?.split(',')[0]?.trim();
  let requestHost = '';
  try {
    requestHost = new URL(request.url).host;
  } catch {
    requestHost = '';
  }

  const host = forwarded || headerHost || requestHost;
  if (host && url.host === host) return true;

  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (site) {
    try {
      if (new URL(site).host === url.host) return true;
    } catch {
      // Ignore a malformed public site URL and keep checking.
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  }

  return false;
}
