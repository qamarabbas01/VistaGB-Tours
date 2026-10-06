/**
 * @jest-environment node
 */

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(async () => ({ error: null })),
    },
  })),
}));

jest.mock('@/lib/server-env', () => ({
  getContactMailEnv: () => ({
    apiKey: 're_test',
    from: 'VistaGB <from@example.com>',
    to: 'inbox@example.com',
  }),
  getContactFormSecret: () => 'test-secret',
}));

import { Resend } from 'resend';
import {
  CONTACT_FLOOD_LIMIT,
  issueContactFormToken,
} from '@/lib/contact/form-guard';
import { POST } from '../route';

const SECRET = 'test-secret';

let ipCounter = 0;

function nextIp() {
  ipCounter += 1;
  return `198.51.100.${ipCounter}`;
}

function token(ageMs = 10_000) {
  return issueContactFormToken({ secret: SECRET, now: Date.now() - ageMs });
}

function inquiry(overrides: Record<string, unknown> = {}) {
  return {
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    destination: 'Hunza Valley',
    places: 'Karimabad',
    travelFrom: '2026-09-12',
    travelTo: '',
    datesFlexible: 'no',
    travelMonth: '',
    duration: '6–7 days',
    groupSize: '2',
    message: 'Traveling with kids.',
    website: '',
    formToken: token(),
    ...overrides,
  };
}

function post(
  body: unknown,
  ip = nextIp(),
  headers: Record<string, string> = {},
) {
  return POST(
    new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        origin: 'http://localhost:3000',
        'user-agent': 'Mozilla/5.0 (compatible; VistaGB test)',
        'x-forwarded-for': ip,
        ...headers,
      },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );
}

function resendCalls() {
  return (Resend as unknown as jest.Mock).mock.calls.length;
}

describe('POST /api/contact bot controls', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sends a form submission that includes a signed token and an empty honeypot', async () => {
    const response = await post(inquiry());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(resendCalls()).toBe(1);
    const mail = (Resend as unknown as jest.Mock).mock.results[0].value.emails
      .send as jest.Mock;
    expect(mail).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: 'ada@example.com',
        text: expect.stringContaining('Ada Lovelace'),
      }),
    );
  });

  it('rejects a direct post that omits the honeypot and the form token', async () => {
    const { website: _website, formToken: _formToken, ...direct } = inquiry();
    const response = await post(direct);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Please use the contact form on this site to send your inquiry.',
    });
    expect(resendCalls()).toBe(0);
  });

  it('pretends a filled or non-string honeypot succeeded and does not send mail', async () => {
    const filled = await post(
      inquiry({ website: 'https://spam.example', formToken: undefined }),
    );
    const weird = await post(inquiry({ website: { href: 'https://spam.example' } }));

    expect(filled.status).toBe(200);
    expect(await filled.json()).toEqual({ ok: true });
    expect(weird.status).toBe(200);
    expect(resendCalls()).toBe(0);
  });

  it('rejects a token that was just issued', async () => {
    const response = await post(inquiry({ formToken: token(0) }));

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Please wait a moment and try sending again.',
    });
    expect(resendCalls()).toBe(0);
  });

  it('rejects a script request with no origin or referer', async () => {
    const response = await POST(
      new Request('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'user-agent': 'Mozilla/5.0 (compatible; VistaGB test)',
          'x-forwarded-for': nextIp(),
        },
        body: JSON.stringify(inquiry()),
      }),
    );

    expect(response.status).toBe(400);
    expect(resendCalls()).toBe(0);
  });

  it('rate-limits repeated inquiries from one IP and one email address', async () => {
    const ip = '203.0.113.40';
    const ipStatuses: number[] = [];
    for (let i = 0; i < 4; i += 1) {
      const response = await post(
        inquiry({ email: `traveler-${i}@example.com` }),
        ip,
      );
      ipStatuses.push(response.status);
    }

    expect(ipStatuses).toEqual([200, 200, 200, 429]);

    const emailStatuses: number[] = [];
    for (let i = 0; i < 4; i += 1) {
      const response = await post(
        inquiry({ email: 'Repeat@Example.com' }),
        nextIp(),
      );
      emailStatuses.push(response.status);
    }

    expect(emailStatuses).toEqual([200, 200, 200, 429]);
    expect(resendCalls()).toBe(6);
  });

  it('stops a flood of token-less posts before they reach mail', async () => {
    const ip = '203.0.113.77';
    const statuses: number[] = [];

    for (let i = 0; i < CONTACT_FLOOD_LIMIT + 1; i += 1) {
      const response = await post({}, ip);
      statuses.push(response.status);
    }

    expect(statuses.slice(0, CONTACT_FLOOD_LIMIT)).toEqual(
      Array.from({ length: CONTACT_FLOOD_LIMIT }, () => 400),
    );
    expect(statuses[CONTACT_FLOOD_LIMIT]).toBe(429);
    expect(resendCalls()).toBe(0);
  });
});
