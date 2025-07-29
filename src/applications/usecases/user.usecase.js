const AppError = require("../../shared/utils/appError.util");
const User = require("../../domain/entities/user.entity");

module.exports = (userRepository) => ({
  createUser: async (data) => {
    const user = new User(data);

    const validation = user.validate();
    if (!validation.isValid) throw new AppError(`Validation failed: ${validation.errors.join(", ")}`, 400);

    const created = await userRepository.create(data);
    if (!created) throw new AppError("Failed to create the user", 400);

    return created;
  },

  getUsers: async (where, include, limit, offset) => {
    const { rows, count } = await userRepository.findAndCount(where, include, limit, offset);
    if (!rows || rows.length === 0) throw new AppError("No users found", 404);

    return { rows, count };
  },

  getUserById: async (id) => {
    const foundUser = await userRepository.findById(id);
    if (!foundUser) throw new AppError("Invalid user id", 400);

    return foundUser;
  },

  updateUser: async (id, data) => {
    const foundUser = await userRepository.findById(id);
    if (!foundUser) throw new AppError("Invalid user id", 400);

    if (data.email && data.email !== foundUser.email) {
      const userByEmail = await userRepository.findByEmail(data.email);
      if (userByEmail && userByEmail.id !== id) throw new AppError("Email is already taken by another user", 400);
    }

    const user = new User({ ...foundUser, ...data });
    const validation = user.validate({ partial: true });
    if (!validation.isValid) throw new AppError(`Validation failed: ${validation.errors.join(", ")}`, 400);

    const updated = await userRepository.update(foundUser, data);
    if (!updated) throw new AppError("Failed to update the user", 400);

    return updated;
  },

  deleteUser: async (id) => {
    const foundUser = await userRepository.findById(id);
    if (!foundUser) throw new AppError("Invalid user id", 400);

    const deleted = await userRepository.delete(foundUser);
    if (!deleted) throw new AppError("Failed to delete the user", 400);

    return deleted;
  },

  truncateUsers: async () => {
    const truncated = await userRepository.truncateNonSuperadmin();
    if (!truncated) throw new AppError("Failed to truncate users", 400);

    return truncated;
  },
});
