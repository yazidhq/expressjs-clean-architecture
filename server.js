const dotenv = require("dotenv");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: `${process.cwd()}/.env.production` });
} else {
  dotenv.config({ path: `${process.cwd()}/.env.development` });
}

const app = require("./app");
const { logger } = require("./app/utils/logger.util");
const { sequelize } = require("./app/config/database");

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
  const APP_URL = process.env.APP_URL || `http://localhost:${PORT}`;
  logger.info(`Server running in ${process.env.NODE_ENV} mode at ${APP_URL}`);
});

sequelize
  .sync({ alter: true })
  .then(() => {
    logger.info("Database synced with alter");
  })
  .catch((err) => {
    logger.error("Failed to sync database:", err);
  });
