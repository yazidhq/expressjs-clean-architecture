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

module.exports = { sendSuccess, sendPaginated };
