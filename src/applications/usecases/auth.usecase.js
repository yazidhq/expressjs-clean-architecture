const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const parseExpires = require("../../shared/utils/times.util");
const AppError = require("../../shared/utils/appError.util");

module.exports = (userRepository, refreshTokenRepository) => {
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

  const saveRefreshToken = async (userId, token) => {
    const expiresAt = new Date(Date.now() + parseExpires(process.env.JWT_REFRESH_EXPIRES_IN));

    await refreshTokenRepository.create({
      userId,
      token,
      expiresAt,
    });
  };

  return {
    signUp: async ({ role, username, email, password, confirmPassword }) => {
      if (!["user"].includes(role)) {
        throw new AppError("Invalid user type", 400);
      }

      const userExists = await userRepository.findByUsername(username);
      if (userExists) {
        throw new AppError("Username already taken", 400);
      }

      const emailExists = await userRepository.findByEmail(email);
      if (emailExists) {
        throw new AppError("Email already registered", 400);
      }

      if (!password || !confirmPassword || password !== confirmPassword) {
        throw new AppError("Passwords do not match", 400);
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
    },

    signIn: async ({ email, password }) => {
      if (!email || !password) {
        throw new AppError("Please provide email and password", 400);
      }

      const user = await userRepository.findByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError("Incorrect email or password", 400);
      }

      const accessToken = createAccessToken({ id: user.id, role: user.role });
      const refreshToken = createRefreshToken({ id: user.id });

      await saveRefreshToken(user.id, refreshToken);

      return { accessToken, refreshToken, user };
    },

    verifyRefreshToken: async (token) => {
      if (!token) throw new AppError("Refresh token required", 400);

      const storedToken = await refreshTokenRepository.findByToken(token);
      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new AppError("Token expired or not found", 400);
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      } catch (err) {
        throw new AppError("Invalid refresh token", 400);
      }

      const user = await userRepository.findById(decoded.id);
      if (!user) throw new AppError("User not found", 400);

      await storedToken.destroy();

      const newAccessToken = createAccessToken({
        id: user.id,
        role: user.role,
      });
      const newRefreshToken = createRefreshToken({ id: user.id });

      await saveRefreshToken(user.id, newRefreshToken);

      return { newAccessToken, newRefreshToken };
    },

    logout: async (token) => {
      if (!token) return null;

      const storedToken = await refreshTokenRepository.findByToken(token);
      if (storedToken) {
        await storedToken.destroy();
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        const user = await userRepository.findById(decoded.id);
        return user;
      } catch {
        return null;
      }
    },
  };
};
