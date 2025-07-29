const redis = require("../../infrastructure/config/redis.config");

const cacheMiddleware = async (req, res, next) => {
  const key = `cache:${req.originalUrl}`;
  const cached = await redis.get(key);

  if (cached) {
    return res.status(200).json(JSON.parse(cached));
  }

  res.sendResponse = res.json;
  res.json = async (body) => {
    await redis.set(key, JSON.stringify(body));
    res.sendResponse(body);
  };

  next();
};

module.exports = cacheMiddleware;
