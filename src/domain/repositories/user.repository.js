const { Op } = require("sequelize");
const db = require("../../infrastructure/database/models");

const User = db.User;

exports.create = async (data) => {
  return await User.create(data);
};

exports.findAndCount = async (where, include, limit, offset) => {
  return await User.findAndCountAll({ where, include, limit, offset });
};

exports.findById = async (id) => {
  return await User.findOne({ where: { id } });
};

exports.update = async (userInstance, data) => {
  return await userInstance.update(data);
};

exports.truncateNonSuperadmin = async () => {
  return await User.destroy({
    where: { role: { [Op.ne]: "superadmin" } },
  });
};

exports.delete = async (userInstance) => {
  return await userInstance.destroy();
};
