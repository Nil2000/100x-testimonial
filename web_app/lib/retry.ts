const RETRYABLE_HTTP_STATUSES = new Set([408, 429, 500, 502, 503, 504]);

const RETRYABLE_ERROR_CODES = new Set([
  "ECONNRESET",
  "ECONNREFUSED",
  "ETIMEDOUT",
  "EPIPE",
  "ENOTFOUND",
  "EAI_AGAIN",
]);

export type RetryOptions = {
  /** Additional attempts after the first try (default: 2 → 3 total attempts). */
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
  shouldRetry?: (error: unknown, attempt: number) => boolean;
  label?: string;
};

export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "HttpError";
  }
}

function getHttpStatus(error: unknown): number | undefined {
  if (error instanceof HttpError) {
    return error.status;
  }

  if (typeof error === "object" && error !== null) {
    const record = error as { status?: number; statusCode?: number };
    if (typeof record.status === "number") {
      return record.status;
    }
    if (typeof record.statusCode === "number") {
      return record.statusCode;
    }
  }

  if (error instanceof Error) {
    const match = error.message.match(/status:\s*(\d+)/i);
    if (match) {
      return Number.parseInt(match[1], 10);
    }
  }

  return undefined;
}

export function isRetryableError(error: unknown): boolean {
  const status = getHttpStatus(error);
  if (status !== undefined) {
    return RETRYABLE_HTTP_STATUSES.has(status);
  }

  if (error instanceof Error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code && RETRYABLE_ERROR_CODES.has(code)) {
      return true;
    }

    const message = error.message.toLowerCase();
    if (
      message.includes("timeout") ||
      message.includes("network") ||
      message.includes("econnreset") ||
      message.includes("socket hang up") ||
      message.includes("fetch failed") ||
      message.includes("rate limit") ||
      message.includes("overloaded") ||
      message.includes("temporarily unavailable") ||
      message.includes("connection is closed") ||
      message.includes("connection lost")
    ) {
      return true;
    }
  }

  if (typeof error === "object" && error !== null) {
    const name = (error as { name?: string }).name;
    if (name === "ReplyError" || name === "MaxRetriesPerRequestError") {
      return true;
    }
  }

  return false;
}

function getBackoffDelayMs(
  attempt: number,
  baseDelayMs: number,
  maxDelayMs: number
): number {
  const exponential = baseDelayMs * 2 ** attempt;
  const jitter = Math.floor(Math.random() * 100);
  return Math.min(exponential + jitter, maxDelayMs);
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const maxRetries = options.maxRetries ?? 2;
  const baseDelayMs = options.baseDelayMs ?? 500;
  const maxDelayMs = options.maxDelayMs ?? 10_000;
  const shouldRetry = options.shouldRetry ?? isRetryableError;
  const label = options.label ?? "operation";

  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      if (attempt >= maxRetries || !shouldRetry(error, attempt)) {
        throw error;
      }

      const delayMs = getBackoffDelayMs(attempt, baseDelayMs, maxDelayMs);
      console.warn(
        `[retry] ${label} failed (attempt ${attempt + 1}/${maxRetries + 1}), retrying in ${delayMs}ms:`,
        error instanceof Error ? error.message : error
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError;
}
