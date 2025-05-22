const db = require("../../infrastructure/database/models");
const RefreshToken = db.refresh_token;

const RefreshTokenRepository = require("../../domain/repositories/refreshToken.repository");

class RefreshTokenImpl extends RefreshTokenRepository {
  async create(data) {
    return await RefreshToken.create(data);
  }

  async findAndCount(where, include, limit, offset) {
    return await RefreshToken.findAndCountAll({
      where,
      include,
      limit,
      offset,
    });
  }

  async findById(id) {
    return await RefreshToken.findOne({ where: { id } });
  }

  async update(refreshTokenInstance, data) {
    return await refreshTokenInstance.update(data);
  }

  async truncate() {
    return await RefreshToken.truncate();
  }

  async delete(refreshTokenInstance) {
    return await refreshTokenInstance.destroy();
  }

  async findByToken(token) {
    return await RefreshToken.findOne({ where: { token } });
  }
}

module.exports = RefreshTokenImpl;
