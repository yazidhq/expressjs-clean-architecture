const app = require("./src/app");
const logger = require("./src/shared/utils/logger.util");

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  const APP_URL = `${process.env.APP_URL}:${PORT}` || `http://localhost:${PORT}`;
  logger.info(`Server running in ${process.env.NODE_ENV} mode at ${APP_URL}`);
});
