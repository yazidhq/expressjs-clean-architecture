const catchAsync = require("../../shared/utils/catchAsync.util");
const helper = require("../../shared/utils/helper.util");
const userUseCase = require("../../compositions/user.composition");
const { sendPaginated, sendSuccess } = require("../../shared/utils/response.util");

const createUser = catchAsync(async (req, res) => {
  const data = req.body;
  const created = await userUseCase.createUser(data);

  res.locals.audit = {
    recordId: created.id,
    oldValue: null,
    newValue: created,
  };

  return sendSuccess(res, "User created successfully", created, 201);
});

const getUsers = catchAsync(async (req, res) => {
  const { page, size, filter } = req.query;
  const { limit, offset, page: currentPage } = helper.getPagination(page, size);
  const { where, include } = helper.buildFilter(filter);

  const { rows, count } = await userUseCase.getUsers(where, include, limit, offset);
  const response = helper.getPagingData(rows, count, currentPage, limit);

  return sendPaginated(res, "Users fetched successfully", response);
});

const getUserById = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await userUseCase.getUserById(userId);

  return sendSuccess(res, "User fetched successfully", user, 200);
});

const updateUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const data = req.body;

  const before = await userUseCase.getUserById(userId);
  const updated = await userUseCase.updateUser(userId, data);

  res.locals.audit = {
    recordId: userId,
    oldValue: before,
    newValue: updated,
  };

  return sendSuccess(res, "User updated successfully", updated, 200);
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.id;
  const before = await userUseCase.getUserById(userId);

  await userUseCase.deleteUser(userId);

  res.locals.audit = {
    recordId: userId,
    oldValue: before,
    newValue: null,
  };

  return sendSuccess(res, "User deleted successfully", null, 200);
});

const truncateUsers = catchAsync(async (req, res) => {
  await userUseCase.truncateUsers();

  res.locals.audit = {
    recordId: "ALL",
    oldValue: null,
    newValue: null,
  };

  return sendSuccess(res, "Data truncated successfully", null, 200);
});

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser, truncateUsers };
