const catchAsync = require("../../shared/utils/catchAsync.util");
const authUsecases = require("../../compositions/auth.composition");
const parseExpires = require("../../shared/utils/times.util");
const { sendSuccess } = require("../../shared/utils/response.util");

const signUp = catchAsync(async (req, res) => {
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

  const data = { result, accessToken };
  return sendSuccess(res, "SignUp succeessfully", data, 201);
});

const signIn = catchAsync(async (req, res) => {
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

  return sendSuccess(res, "SignIn succeessfully", accessToken);
});

const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;

  const { newAccessToken, newRefreshToken } = await authUsecases.verifyRefreshToken(token);

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: parseExpires(process.env.JWT_REFRESH_EXPIRES_IN),
  });

  return sendSuccess(res, "Refresh token succeessfully", newAccessToken);
});

const logout = catchAsync(async (req, res) => {
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

  return sendSuccess(res, "Logged out succeessfully");
});

module.exports = { signUp, signIn, refreshToken, logout };
