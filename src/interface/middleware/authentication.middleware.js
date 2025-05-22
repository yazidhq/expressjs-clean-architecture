const jwt = require("jsonwebtoken");
const AppError = require("../../shared/utils/appError.util");
const { catchAsync } = require("../../shared/utils/catchAsync.util");
const db = require("../../infrastructure/database/models");

const User = db.user;

const authentication = catchAsync(async (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("Please signin to access", 401));
  }

  const tokenDetail = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const userData = await User.findByPk(tokenDetail.id);

  if (!userData) {
    return next(new AppError("User no longer exists", 400));
  }

  req.user = userData;

  return next();
});

const restrictTo = (...role) => {
  const checkPermission = (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 403)
      );
    }

    return next();
  };

  return checkPermission;
};

module.exports = { authentication, restrictTo };
