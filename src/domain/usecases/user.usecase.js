const AppError = require("../../shared/utils/appError.util");
const userRepository = require("../repositories/user.repository");

exports.createUser = async (data) => {
  const created = await userRepository.create(data);
  if (!created) throw new AppError("Failed to create the user", 400);
  return created;
};

exports.getUsers = async (where, include, limit, offset) => {
  const { rows, count } = await userRepository.findAndCount(
    where,
    include,
    limit,
    offset
  );
  if (!rows || rows.length === 0) throw new AppError("No users found", 404);
  return { rows, count };
};

exports.getUserById = async (id) => {
  const foundUser = await userRepository.findById(id);
  if (!foundUser) throw new AppError("Invalid user id", 400);
  return foundUser;
};

exports.updateUser = async (id, data) => {
  const foundUser = await userRepository.findById(id);
  if (!foundUser) throw new AppError("Invalid user id", 400);

  const updated = await userRepository.update(foundUser, data);
  if (!updated) throw new AppError("Failed to update the user", 400);

  return updated;
};

exports.truncateUsers = async () => {
  const truncated = await userRepository.truncateNonSuperadmin();
  if (!truncated) throw new AppError("Failed to truncate users", 400);
  return truncated;
};

exports.deleteUser = async (id) => {
  const foundUser = await userRepository.findById(id);
  if (!foundUser) throw new AppError("Invalid user id", 400);

  const deleted = await userRepository.delete(foundUser);
  if (!deleted) throw new AppError("Failed to delete the user", 400);

  return deleted;
};
