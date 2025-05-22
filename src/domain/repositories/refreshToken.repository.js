const db = require("../../infrastructure/database/models");

const RefreshToken = db.refresh_token;

exports.create = async (data) => {
  return await RefreshToken.create(data);
};

exports.findAndCount = async (where, include, limit, offset) => {
  return await RefreshToken.findAndCountAll({ where, include, limit, offset });
};

exports.findById = async (id) => {
  return await RefreshToken.findOne({ where: { id } });
};

exports.update = async (refreshTokenInstance, data) => {
  return await refreshTokenInstance.update(data);
};

exports.truncate = async () => {
  return await RefreshToken.truncate();
};

exports.delete = async (refreshTokenInstance) => {
  return await refreshTokenInstance.destroy();
};

exports.findByToken = async (token) => {
  return await RefreshToken.findOne({ where: { token } });
};
