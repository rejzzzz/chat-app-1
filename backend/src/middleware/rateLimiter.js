import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 10, // each IP can make up to 10 requests per `windowsMs` (5 minutes)
    standardHeaders: true, // add the `RateLimit-*` headers to the response
    legacyHeaders: false, // remove the `X-RateLimit-*` headers from the response
    message: 'Too many requests from this IP, please try again later',

    handler: (req, res) => {
        res.status(429).json({
            error: 'Too many requests',
            retryAfter: res.getHeader('Retry-After'),
            limit: res.getHeader('RateLimit-Limit'),
            remaining: res.getHeader('RateLimit-Remaining')
        });
    }

  });

  export default loginLimiter;