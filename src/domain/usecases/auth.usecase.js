const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/user.repository");
const refreshTokenRepository = require("../repositories/refreshToken.repository");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

function parseExpires(expiryStr) {
  const unit = expiryStr.slice(-1);
  const amount = parseInt(expiryStr.slice(0, -1));
  switch (unit) {
    case "d":
      return amount * 24 * 60 * 60 * 1000;
    case "h":
      return amount * 60 * 60 * 1000;
    case "m":
      return amount * 60 * 1000;
    default:
      return 30 * 24 * 60 * 60 * 1000;
  }
}

const saveRefreshToken = async (userId, token) => {
  const expiresAt = new Date(
    Date.now() + parseExpires(process.env.JWT_REFRESH_EXPIRES_IN)
  );

  await refreshTokenRepository.create({
    userId,
    token,
    expiresAt,
  });
};

const signUp = async ({ role, username, email, password, confirmPassword }) => {
  if (!["user"].includes(role)) {
    throw new Error("Invalid user type");
  }

  const userExists = await userRepository.findByUsername(username);
  if (userExists) {
    throw new Error("Username already taken");
  }

  const emailExists = await userRepository.findByEmail(email);
  if (emailExists) {
    throw new Error("Email already registered");
  }

  if (!password || !confirmPassword || password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const user = await userRepository.create({
    role,
    username,
    email,
    password,
    confirmPassword,
  });

  const result = user.toJSON();
  delete result.password;
  delete result.deletedAt;

  const accessToken = createAccessToken({ id: user.id, role: user.role });
  const refreshToken = createRefreshToken({ id: user.id });

  await saveRefreshToken(user.id, refreshToken);

  return { result, accessToken, refreshToken };
};

const signIn = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const user = await userRepository.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Incorrect email or password");
  }

  const accessToken = createAccessToken({ id: user.id, role: user.role });
  const refreshToken = createRefreshToken({ id: user.id });

  await saveRefreshToken(user.id, refreshToken);

  return { accessToken, refreshToken };
};

const verifyRefreshToken = async (token) => {
  if (!token) throw new Error("Refresh token required");

  const storedToken = await refreshTokenRepository.findByToken(token);
  if (!storedToken || storedToken.expiresAt < new Date()) {
    throw new Error("Token expired or not found");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid refresh token");
  }

  const user = await userRepository.findById(decoded.id);
  if (!user) throw new Error("User not found");

  await storedToken.destroy();

  const newAccessToken = createAccessToken({ id: user.id, role: user.role });
  const newRefreshToken = createRefreshToken({ id: user.id });

  await saveRefreshToken(user.id, newRefreshToken);

  return { newAccessToken, newRefreshToken };
};

const logout = async (token) => {
  if (token) {
    const storedToken = await refreshTokenRepository.findByToken(token);
    await storedToken.destroy();
  }
};

module.exports = {
  signUp,
  signIn,
  verifyRefreshToken,
  logout,
  parseExpires,
};
