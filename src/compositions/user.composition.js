const UserRepositoryImpl = require("../infrastructures/repositories/user.repository.impl");

const createUserUsecase = require("../applications/usecases/user.usecase");

const userRepository = new UserRepositoryImpl();

const userUsecases = createUserUsecase(userRepository);

module.exports = userUsecases;
