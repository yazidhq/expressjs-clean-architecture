const { catchAsync } = require("../../shared/utils/catchAsync.util");
const helper = require("../../shared/utils/helper.util");
const userUseCase = require("../../domain/usecases/user.usecase");

exports.createUser = catchAsync(async (req, res, next) => {
  const data = req.body;
  const create = await userUseCase.createUser(data);
  return sendSuccess(res, "User created successfully", create, 201);
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const { page, size, filter } = req.query;
  const { limit, offset, page: currentPage } = helper.getPagination(page, size);
  const { where, include } = helper.buildFilter(filter);

  const { rows, count } = await userUseCase.getUsers(
    where,
    include,
    limit,
    offset
  );
  const response = helper.getPagingData(rows, count, currentPage, limit);

  return sendPaginated(res, "Users fetched successfully", response);
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userUseCase.findUserById(userId);
  return sendSuccess(res, "User fetched successfully", user, 200);
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const data = req.body;
  const update = await userUseCase.updateUser(userId, data);
  return sendSuccess(res, "User updated successfully", update, 200);
});

exports.truncateUsers = catchAsync(async (req, res, next) => {
  await userUseCase.truncateUsers();
  return sendSuccess(res, "Data truncated successfully", null, 200);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  await userUseCase.deleteUser(userId);
  return sendSuccess(res, "User deleted successfully", null, 200);
});
