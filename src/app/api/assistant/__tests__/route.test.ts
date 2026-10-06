/**
 * @jest-environment node
 */

jest.mock('@/lib/server-env', () => ({
  getAssistantEnv: () => ({ apiKey: '', model: 'test-model' }),
}));

jest.mock('@/lib/assistant/retrieve', () => ({
  buildTravelContext: jest.fn(async () => ({
    query: '',
    intent: 'general',
    destinations: [],
    weather: null,
    generalTopics: [],
  })),
}));

jest.mock('@/lib/assistant/local', () => ({
  answerLocally: jest.fn(() => 'Local answer'),
}));

import { buildTravelContext } from '@/lib/assistant/retrieve';
import {
  ASSISTANT_MAX_BODY_BYTES,
  ASSISTANT_MAX_JSON_DEPTH,
  ASSISTANT_OVERSIZE_LIMIT,
} from '@/lib/assistant/body-limits';
import { POST } from '../route';

const buildContext = jest.mocked(buildTravelContext);

let ipCounter = 0;

function nextIp() {
  ipCounter += 1;
  return `198.51.100.${ipCounter}`;
}

function post(
  body: BodyInit,
  headers: Record<string, string> = {},
  ip = nextIp(),
) {
  return POST(
    new Request('http://localhost/api/assistant', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-forwarded-for': ip,
        ...headers,
      },
      body,
      ...(body instanceof ReadableStream ? { duplex: 'half' as const } : {}),
    }),
  );
}

function chunked(chunks: Uint8Array[]) {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
}

describe('POST /api/assistant payload limits', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('answers a normal trip question', async () => {
    const response = await post(
      JSON.stringify({
        messages: [{ role: 'user', content: 'Help me plan a trip to Hunza.' }],
        destinationSlug: 'hunza-valley',
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('X-VistaGB-Assistant')).toBe('local');
    expect(await response.text()).toBe('Local answer');
    expect(buildContext).toHaveBeenCalledTimes(1);
    expect(buildContext).toHaveBeenCalledWith(
      'Help me plan a trip to Hunza.',
      'hunza-valley',
    );
  });

  it('rejects a declared Content-Length over the cap before building context', async () => {
    const response = await POST(
      new Request('http://localhost/api/assistant', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'content-length': String(ASSISTANT_MAX_BODY_BYTES + 100),
          'x-forwarded-for': nextIp(),
        },
      }),
    );

    expect(response.status).toBe(413);
    expect(await response.json()).toEqual({
      error: 'Request body is too large.',
    });
    expect(buildContext).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
  });

  it('rejects a chunked body that exceeds the cap without a Content-Length', async () => {
    const chunk = new Uint8Array(64 * 1024);
    const response = await post(chunked([chunk, chunk, new Uint8Array([1])]));

    expect(response.status).toBe(413);
    expect(buildContext).not.toHaveBeenCalled();
  });

  it('rejects a valid message shape padded with a huge extra field', async () => {
    const response = await post(
      JSON.stringify({
        messages: [{ role: 'user', content: 'hi' }],
        padding: 'x'.repeat(ASSISTANT_MAX_BODY_BYTES),
      }),
    );

    expect(response.status).toBe(413);
    expect(buildContext).not.toHaveBeenCalled();
  });

  it('rejects a deeply nested body before parsing it into context', async () => {
    const depth = ASSISTANT_MAX_JSON_DEPTH + 5;
    const response = await post(
      `${'{"a":'.repeat(depth)}1${'}'.repeat(depth)}`,
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      error: 'Request payload is too deeply nested.',
    });
    expect(buildContext).not.toHaveBeenCalled();
  });

  it('allows brace characters inside a message string', async () => {
    const response = await post(
      JSON.stringify({
        messages: [
          {
            role: 'user',
            content: `What does ${'{"a":'.repeat(12)} mean for Hunza?`,
          },
        ],
      }),
    );

    expect(response.status).toBe(200);
    expect(buildContext).toHaveBeenCalledTimes(1);
  });

  it('still rejects an over-long message before building context', async () => {
    const response = await post(
      JSON.stringify({
        messages: [{ role: 'user', content: 'a'.repeat(2001) }],
      }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: 'Message is too long.' });
    expect(buildContext).not.toHaveBeenCalled();
  });

  it('throttles repeated oversized requests from the same IP', async () => {
    const ip = '203.0.113.50';
    const body = 'x'.repeat(ASSISTANT_MAX_BODY_BYTES + 1);
    const statuses: number[] = [];

    for (let i = 0; i < ASSISTANT_OVERSIZE_LIMIT + 1; i += 1) {
      const response = await post(body, {}, ip);
      statuses.push(response.status);
    }

    expect(statuses.slice(0, ASSISTANT_OVERSIZE_LIMIT)).toEqual(
      Array.from({ length: ASSISTANT_OVERSIZE_LIMIT }, () => 413),
    );
    expect(statuses[ASSISTANT_OVERSIZE_LIMIT]).toBe(429);
    expect(buildContext).not.toHaveBeenCalled();
  });
});
