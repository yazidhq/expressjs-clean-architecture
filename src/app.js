const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");
const { glob } = require("glob");

const corsOption = require("./interfaces/middleware/cors.middleware");
const sanitizeGlobal = require("./interfaces/middleware/sanitize.middleware");
const globalErrorHandler = require("./interfaces/middleware/error.middleware");
const logger = require("./shared/utils/logger.util");
const AppError = require("./shared/utils/appError.util");
const catchAsync = require("./shared/utils/catchAsync.util");

const app = express();

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(sanitizeGlobal);
app.use(compression());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https:"],
        imgSrc: ["'self'", "data:", "https:"],
        objectSrc: ["'none'"],
      },
    },
  })
);

app.use((req, res, next) => {
  res.on("finish", () => {
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode}`);
  });
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({ message: "API" });
});

app.get("/health-check", (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    timestamp: Date.now(),
  };

  try {
    res.status(200).json(healthCheck);
  } catch (error) {
    res.status(503).json(error.message);
  }
});

const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./infrastructures/config/swagger.config");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

glob.sync("./src/interfaces/routes/*.js").forEach((file) => {
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
