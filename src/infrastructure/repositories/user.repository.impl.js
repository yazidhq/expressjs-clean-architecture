const { Op } = require("sequelize");
const db = require("../database/models");
const User = db.user;

const UserRepository = require("../../domain/repositories/user.repository");

class UserRepositoryImpl extends UserRepository {
  async create(userEntity) {
    return await User.create(userEntity);
  }

  async findAndCount(where, include, limit, offset) {
    return await User.findAndCountAll({ where, include, limit, offset });
  }

  async findById(id) {
    return await User.findOne({ where: { id } });
  }

  async update(userInstance, data) {
    return await userInstance.update(data);
  }

  async delete(userInstance) {
    return await userInstance.destroy();
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async truncateNonSuperadmin() {
    return await User.destroy({
      where: { role: { [Op.ne]: "superadmin" } },
    });
  }
}

module.exports = UserRepositoryImpl;
