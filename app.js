const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");
const { glob } = require("glob");

const corsOption = require("./app/middleware/cors.middleware");
const sanitizeGlobal = require("./app/middleware/sanitize.middleware");
const { logger } = require("./app/utils/logger.util");
const AppError = require("./app/utils/appError.util");
const { catchAsync } = require("./app/utils/catchAsync.util");
const globalErrorHandler = require("./app/middleware/error.middleware");

const app = express();

app.use(cors(corsOption));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(sanitizeGlobal);
app.use(compression());

app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "API" });
});

glob.sync("./app/routes/*.js").forEach((file) => {
  require(path.resolve(file))(app);
});

app.use(
  "*",
  catchAsync(async (req, res, next) => {
    const msg = `Can't find ${req.originalUrl} on this server`;
    logger.warn(msg);
    throw new AppError(msg, 404);
  })
);

app.use(globalErrorHandler);

module.exports = app;
