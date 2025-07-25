const redis = require("redis");
const logger = require("../../shared/utils/logger.util");

const client = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  password: process.env.REDIS_PASSWORD || undefined,
});

client.on("error", (err) => {
  logger.error(`Redis Error: ${err}`);
});

client.on("connect", () => {
  logger.info("Connected to Redis");
});

(async () => {
  if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error("Missing REDIS_HOST or REDIS_PORT in environment variables.");
  }

  try {
    if (!client.isOpen) {
      await client.connect();
    }
  } catch (err) {
    logger.error(`Redis connection failed: ${err}`);
  }
})();

process.on("SIGINT", async () => {
  await client.quit();
  logger.info("Redis disconnected due to app termination");
  process.exit(0);
});

module.exports = client;
