const AppError = require("../../shared/utils/appError.util");

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";
  const message = err.message;
  const stack = err.stack;

  return res.status(statusCode).json({
    status,
    message,
    stack,
  });
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

module.exports = globalErrorHandler;
