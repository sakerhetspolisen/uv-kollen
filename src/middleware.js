import { NextResponse } from "next/server";
import rateLimiter from "./lib/redisRateLimiter";

export default async function middleware(req) {
  const identifier = req.ip;
  const rateLimitRes = await rateLimiter(identifier, 100, 60);
  if (rateLimitRes.success) {
    const res = NextResponse.next();
    res.headers.set("X-Rate-Limit-Limit", rateLimitRes.limit);
    res.headers.set("X-Rate-Limit-Remaining", rateLimitRes.remaining);
    return res;
  }
  return new NextResponse(
    JSON.stringify({
      success: false,
      message: "Too many requests. Please try again in a few minutes.",
    }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "X-Rate-Limit-Limit": rateLimitRes.limit,
        "X-Rate-Limit-Remaining": 0,
      },
    }
  );
}

export const config = {
  matcher: ["/_next/data/:path*", "/api/:path*", "/stad/:path*"],
};
