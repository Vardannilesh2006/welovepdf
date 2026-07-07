interface RateLimitBucket {
  count: number;
  resetTime: number;
}

const ipCache = new Map<string, RateLimitBucket>();

/**
 * In-memory IP-bucket rate limiter.
 * Default: 20 requests per 1 minute (60,000 ms) window per IP.
 */
export function isRateLimited(ip: string, limit = 20, windowMs = 60 * 1000): boolean {
  const now = Date.now();
  const bucket = ipCache.get(ip);

  if (!bucket) {
    ipCache.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });
    return false;
  }

  if (now > bucket.resetTime) {
    bucket.count = 1;
    bucket.resetTime = now + windowMs;
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}
