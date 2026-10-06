/**
 * @jest-environment node
 */

import {
  ASSISTANT_MAX_BODY_BYTES,
  ASSISTANT_MAX_JSON_DEPTH,
  PayloadTooLargeError,
  jsonNestingDepth,
  oversizedContentLength,
  readBodyLimited,
} from '@/lib/assistant/body-limits';

function requestWithLength(length: string) {
  return new Request('http://localhost/api/assistant', {
    method: 'POST',
    headers: { 'content-length': length },
  });
}

function chunkedRequest(chunks: Uint8Array[]) {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });

  const init: RequestInit & { duplex: 'half' } = {
    method: 'POST',
    body: stream,
    duplex: 'half',
  };

  return new Request('http://localhost/api/assistant', init);
}

describe('assistant body limits', () => {
  it('flags a Content-Length above the cap and ignores a fitting one', () => {
    expect(
      oversizedContentLength(
        requestWithLength(String(ASSISTANT_MAX_BODY_BYTES)),
        ASSISTANT_MAX_BODY_BYTES,
      ),
    ).toBeNull();

    expect(
      oversizedContentLength(
        requestWithLength(String(ASSISTANT_MAX_BODY_BYTES + 25)),
        ASSISTANT_MAX_BODY_BYTES,
      ),
    ).toBe(ASSISTANT_MAX_BODY_BYTES + 25);

    expect(
      oversizedContentLength(
        requestWithLength('9999999999999999'),
        ASSISTANT_MAX_BODY_BYTES,
      ),
    ).toBe(ASSISTANT_MAX_BODY_BYTES + 1);

    expect(
      oversizedContentLength(
        requestWithLength('nope'),
        ASSISTANT_MAX_BODY_BYTES,
      ),
    ).toBeNull();
  });

  it('reads a chunked body up to the byte cap', async () => {
    const payload = new TextEncoder().encode('{"messages":[]}');
    const mid = 4;
    const text = await readBodyLimited(
      chunkedRequest([payload.slice(0, mid), payload.slice(mid)]),
      ASSISTANT_MAX_BODY_BYTES,
    );

    expect(text).toBe('{"messages":[]}');
  });

  it('stops reading once the next chunk crosses the cap', async () => {
    const chunk = new Uint8Array(32);
    chunk.fill(120);

    await expect(
      readBodyLimited(chunkedRequest([chunk, chunk]), 40),
    ).rejects.toMatchObject({
      name: 'PayloadTooLargeError',
      bytes: 64,
    });

    await expect(
      readBodyLimited(chunkedRequest([chunk, chunk]), 40),
    ).rejects.toBeInstanceOf(PayloadTooLargeError);
  });

  it('counts braces in structure and ignores braces inside strings', () => {
    const valid = JSON.stringify({
      messages: [{ role: 'user', content: '{"a":'.repeat(40) }],
    });
    expect(jsonNestingDepth(valid)).toBe(3);

    const bomb = `${'{"a":'.repeat(ASSISTANT_MAX_JSON_DEPTH + 4)}1${'}'.repeat(
      ASSISTANT_MAX_JSON_DEPTH + 4,
    )}`;
    expect(jsonNestingDepth(bomb)).toBe(ASSISTANT_MAX_JSON_DEPTH + 1);

    expect(jsonNestingDepth('{"note":"he said \\"{hi}\\""}')).toBe(1);
  });
});
