const db = require("../../infrastructures/database/models");
const RefreshToken = db.refresh_token;

const RefreshTokenRepository = require("../../domain/repositories/refreshToken.repository");

class RefreshTokenImpl extends RefreshTokenRepository {
  async create(refreshTokenEntity) {
    return await RefreshToken.create(refreshTokenEntity);
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

  async update(refreshTokenInstance, refreshTokenEntity) {
    return await refreshTokenInstance.update(refreshTokenEntity);
  }

  async delete(refreshTokenInstance) {
    return await refreshTokenInstance.destroy();
  }

  async truncate() {
    return await RefreshToken.truncate();
  }

  async findByToken(token) {
    return await RefreshToken.findOne({ where: { token } });
  }
}

module.exports = RefreshTokenImpl;
