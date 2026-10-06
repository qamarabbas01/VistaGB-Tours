/**
 * @jest-environment node
 */

import {
  CONTACT_MAX_AGE_MS,
  CONTACT_MAX_BODY_BYTES,
  contactTokenError,
  declaredBodyTooLarge,
  hasTrustedContactMetadata,
  isHoneypotTripped,
  issueContactFormToken,
  verifyContactFormToken,
} from '@/lib/contact/form-guard';

const SECRET = 'test-secret';

function request(headers: Record<string, string>) {
  return new Request('http://localhost:3000/api/contact', {
    method: 'POST',
    headers,
  });
}

describe('contact form guard', () => {
  it('accepts a token only after the minimum fill time and before it expires', () => {
    const now = 1_700_000_000_000;
    const fresh = issueContactFormToken({ secret: SECRET, now });
    expect(verifyContactFormToken(fresh, SECRET, now + 500)).toEqual({
      ok: false,
      reason: 'too-fast',
    });
    expect(verifyContactFormToken(fresh, SECRET, now + 5_000)).toEqual({
      ok: true,
    });
    expect(
      verifyContactFormToken(fresh, SECRET, now + CONTACT_MAX_AGE_MS + 1),
    ).toEqual({ ok: false, reason: 'expired' });
  });

  it('rejects a missing, forged, or cross-signed token', () => {
    expect(verifyContactFormToken(undefined, SECRET)).toEqual({
      ok: false,
      reason: 'missing',
    });

    const token = issueContactFormToken({
      secret: SECRET,
      now: Date.now() - 5_000,
    });
    const forged = `${token.slice(0, -1)}${token.endsWith('a') ? 'b' : 'a'}`;
    expect(verifyContactFormToken(forged, SECRET)).toEqual({
      ok: false,
      reason: 'invalid',
    });
    expect(verifyContactFormToken(token, 'other-secret')).toEqual({
      ok: false,
      reason: 'invalid',
    });
    expect(contactTokenError('missing')).toMatch(/contact form/i);
  });

  it('treats a filled or non-string honeypot as tripped and an omitted field as not', () => {
    expect(isHoneypotTripped(undefined)).toBe(false);
    expect(isHoneypotTripped('')).toBe(false);
    expect(isHoneypotTripped('   ')).toBe(false);
    expect(isHoneypotTripped('https://spam.example')).toBe(true);
    expect(isHoneypotTripped(1)).toBe(true);
    expect(isHoneypotTripped({ url: 'https://spam.example' })).toBe(true);
  });

  it('requires JSON, a real user agent, and a same-site origin or referer', () => {
    const browser = {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (compatible; VistaGB test)',
      origin: 'http://localhost:3000',
    };

    expect(hasTrustedContactMetadata(request(browser))).toBe(true);

    const { origin: _origin, ...withoutOrigin } = browser;
    expect(
      hasTrustedContactMetadata(
        request({
          ...withoutOrigin,
          referer: 'http://localhost:3000/contact',
        }),
      ),
    ).toBe(true);
    expect(hasTrustedContactMetadata(request(withoutOrigin))).toBe(false);
    expect(
      hasTrustedContactMetadata(request({ ...browser, 'user-agent': 'curl' })),
    ).toBe(false);
    expect(
      hasTrustedContactMetadata(
        request({ ...browser, 'content-type': 'text/plain' }),
      ),
    ).toBe(false);
    expect(
      hasTrustedContactMetadata(
        request({ ...browser, origin: 'https://evil.example' }),
      ),
    ).toBe(false);
  });

  it('flags a Content-Length above the contact body cap', () => {
    expect(
      declaredBodyTooLarge(
        request({ 'content-length': String(CONTACT_MAX_BODY_BYTES + 1) }),
      ),
    ).toBe(true);
    expect(
      declaredBodyTooLarge(
        request({ 'content-length': String(CONTACT_MAX_BODY_BYTES) }),
      ),
    ).toBe(false);
  });
});
