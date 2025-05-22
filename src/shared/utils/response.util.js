exports.sendSuccess = (
  res,
  message = "Success",
  data = null,
  statusCode = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

exports.sendPaginated = (
  res,
  message = "Success",
  pagination = {},
  statusCode = 200
) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    ...pagination,
  });
};
