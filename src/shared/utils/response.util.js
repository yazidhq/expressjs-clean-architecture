const AppError = require("./appError.util");
const logger = require("./logger.util");

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;

  return res.status(statusCode).json({ status, message, stack });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;

  if (err.isOperational) {
    return res.status(statusCode).json({
      status,
      message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Something went very wrong",
  });
};

const globalErrorHandler = (err, req, res, next) => {
  logger.error(`[${req.method}] ${req.originalUrl} - ${err.message}`);
  logger.error(err.stack);

  if (err.name === "SequelizeValidationError") {
    err = new AppError(err.errors[0].message, 400);
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    err = new AppError(err.errors[0].message, 400);
  }

  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }

  return sendErrorProd(err, res);
};

const sendSuccess = (res, message = "Success", data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const sendPaginated = (res, message = "Success", pagination = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    page: pagination.page,
    totalPages: pagination.totalPages,
    dataCount: pagination.count,
    limit: pagination.limit,
    data: pagination.data,
  });
};

module.exports = { globalErrorHandler, sendSuccess, sendPaginated };
