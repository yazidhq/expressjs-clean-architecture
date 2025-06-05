const catchAsync = require("../../shared/utils/catchAsync.util");
const authUsecases = require("../../compositions/auth.composition");
const parseExpires = require("../../shared/utils/times.util");

const signUp = catchAsync(async (req, res, next) => {
  const { result, accessToken, refreshToken } = await authUsecases.signUp(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  res.locals.audit = {
    recordId: result.id,
    oldValue: null,
    newValue: {
      username: result.username,
      email: result.email,
      role: result.role,
    },
  };

  res.status(201).json({
    status: "success",
    data: result,
    token: accessToken,
  });
});

const signIn = catchAsync(async (req, res, next) => {
  const { accessToken, refreshToken, user } = await authUsecases.signIn(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  res.locals.audit = {
    recordId: user.id,
    oldValue: null,
    newValue: {
      email: user.email,
      loginTime: new Date(),
    },
  };

  res.status(200).json({
    status: "success",
    token: accessToken,
  });
});

const refreshToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  const { newAccessToken, newRefreshToken } = await authUsecases.verifyRefreshToken(token);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  res.status(200).json({
    status: "success",
    token: newAccessToken,
  });
});

const logout = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;
  const user = await authUsecases.logout(token);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.locals.audit = {
    recordId: user.id,
    oldValue: null,
    newValue: {
      email: user.email,
      logoutTime: new Date(),
    },
  };

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});

module.exports = { signUp, signIn, refreshToken, logout };
