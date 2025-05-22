const { catchAsync } = require("../utils/catchAsync.util");
const authService = require("../services/auth.service");

exports.signUp = catchAsync(async (req, res, next) => {
  const { result, accessToken, refreshToken } = await authService.signUp(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: authService.parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  res.status(201).json({
    status: "success",
    data: result,
    token: accessToken,
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { accessToken, refreshToken } = await authService.signIn(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: authService.parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  res.status(200).json({
    status: "success",
    token: accessToken,
  });
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  const { newAccessToken, newRefreshToken } =
    await authService.verifyRefreshToken(token);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: authService.parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  res.status(200).json({
    status: "success",
    token: newAccessToken,
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  await authService.logout(token);

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});
