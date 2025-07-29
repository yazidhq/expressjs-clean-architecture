const redis = require("../../infrastructures/config/redis.config");

const DEFAULT_TTL = parseInt(process.env.REDIS_TTL || "60");
const KEY_PREFIX = process.env.REDIS_PREFIX || "myapp:";

const buildKey = (key) => `${KEY_PREFIX}${key}`;

const get = async (key) => {
  const data = await redis.get(buildKey(key));
  return data ? JSON.parse(data) : null;
};

const set = async (key, value, ttl = DEFAULT_TTL) => {
  await redis.set(buildKey(key), JSON.stringify(value), { EX: ttl });
};

const del = async (key) => {
  if (Array.isArray(key)) {
    const builtKeys = key.map(buildKey);
    if (builtKeys.length > 0) {
      await redis.del(...builtKeys);
    }
  } else {
    await redis.del(buildKey(key));
  }
};

const clearCachePrefix = async (prefix) => {
  const keys = await redis.keys(`${KEY_PREFIX}${prefix}*`);
  if (keys.length > 0) {
    await redis.del(...keys);
  }
};

module.exports = { get, set, del, clearCachePrefix };
