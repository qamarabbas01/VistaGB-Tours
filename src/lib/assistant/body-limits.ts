/**
 * Largest assistant body we will buffer.
 * Twelve messages at 2,000 characters still fit when every character is a
 * 4-byte UTF-8 sequence, with room left for JSON framing.
 */
export const ASSISTANT_MAX_BODY_BYTES = 128 * 1024;

/**
 * A valid assistant body nests at most three levels
 * (object → messages array → message). Anything deeper is rejected
 * before JSON.parse so a nesting bomb cannot blow the stack.
 */
export const ASSISTANT_MAX_JSON_DEPTH = 8;

export const ASSISTANT_OVERSIZE_LIMIT = 5;
export const ASSISTANT_OVERSIZE_WINDOW_MS = 60 * 1000;

export class PayloadTooLargeError extends Error {
  readonly bytes: number;

  constructor(bytes: number) {
    super('Payload too large');
    this.name = 'PayloadTooLargeError';
    this.bytes = bytes;
  }
}

/**
 * Returns a byte count when Content-Length is present and over the cap.
 * Missing or non-numeric values return null so the caller measures the stream.
 */
export function oversizedContentLength(
  request: Request,
  maxBytes: number,
): number | null {
  const header = request.headers.get('content-length');
  if (header === null) return null;

  const trimmed = header.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  // Longer than this cannot be a safe integer; still treat it as oversized.
  if (trimmed.length > 15) return maxBytes + 1;

  const bytes = Number(trimmed);
  if (!Number.isFinite(bytes)) return maxBytes + 1;
  if (bytes > maxBytes) return bytes;
  return null;
}

/**
 * Reads the request body as text, stopping once `maxBytes` is exceeded.
 * The oversized chunk is not appended, and the stream is cancelled.
 */
export async function readBodyLimited(
  request: Request,
  maxBytes: number,
): Promise<string> {
  const body = request.body;
  if (!body) return '';

  const reader = body.getReader();
  const decoder = new TextDecoder();
  const parts: string[] = [];
  let received = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value?.byteLength) continue;

      received += value.byteLength;
      if (received > maxBytes) {
        throw new PayloadTooLargeError(received);
      }
      parts.push(decoder.decode(value, { stream: true }));
    }

    parts.push(decoder.decode());
    return parts.join('');
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  } finally {
    try {
      reader.releaseLock();
    } catch {
      // cancel() already released the lock.
    }
  }
}

/**
 * Maximum `{` / `[` nesting in raw JSON text. Braces inside strings are ignored.
 * Returns as soon as the depth passes `maxDepth`.
 */
export function jsonNestingDepth(
  raw: string,
  maxDepth = ASSISTANT_MAX_JSON_DEPTH,
): number {
  let depth = 0;
  let max = 0;
  let inString = false;
  let escaped = false;

  for (let i = 0; i < raw.length; i += 1) {
    const char = raw[i];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === '"') inString = false;
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{' || char === '[') {
      depth += 1;
      if (depth > max) max = depth;
      if (max > maxDepth) return max;
      continue;
    }

    if ((char === '}' || char === ']') && depth > 0) {
      depth -= 1;
    }
  }

  return max;
}
