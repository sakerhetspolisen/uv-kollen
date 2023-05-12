import { kv } from "@vercel/kv";

export default async function rateLimiter(ip, limit, duration) {
  const key = `rate_limit:${ip}`;
  const currentCount = await kv.get(key);
  const count = parseInt(currentCount, 10) || 0;
  if (count >= limit) {
    return {
      limit,
      remaining: limit - count,
      success: false,
    };
  }
  kv.incr(key);
  kv.expire(key, duration);
  return {
    limit,
    remaining: limit - (count + 1),
    success: true,
  };
}
