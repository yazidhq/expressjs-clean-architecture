const rateLimit = require("express-rate-limit");
const { catchAsync } = require("../../shared/utils/catchAsync.util");

const db = require("../../infrastructure/database/models");

const Ratelimitlogs = db.rate_limit_log;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
  handler: catchAsync(async (req, res, next, options) => {
    const ip = req.headers["x-forwarded-for"]?.split(",").shift() || req.ip;

    await Ratelimitlogs.create({
      ip_address: ip,
      endpoint: req.originalUrl,
    });

    res.status(options.statusCode).json({
      status: "fail",
      message: options.message,
    });
  }),
});

module.exports = limiter;
