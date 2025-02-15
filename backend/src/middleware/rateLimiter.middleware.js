import rateLimit from "express-rate-limit";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5m
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later",

  handler: (req, res) => {
    res.status(429).json({
      error: "Too many requests",
      retryAfter: res.getHeader("Retry-After"),
      limit: res.getHeader("RateLimit-Limit"),
      remaining: res.getHeader("RateLimit-Remaining"),
    });
  },
});
