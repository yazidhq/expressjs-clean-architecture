const UserRepositoryImpl = require("../infrastructures/repositories/user.repository.impl");
const RefreshTokenRepositoryImpl = require("../infrastructures/repositories/refreshToken.repository.impl");

const createAuthUsecase = require("../domain/usecases/auth.usecase");

const userRepository = new UserRepositoryImpl();
const refreshTokenRepository = new RefreshTokenRepositoryImpl();

const authUsecases = createAuthUsecase(userRepository, refreshTokenRepository);

module.exports = authUsecases;
