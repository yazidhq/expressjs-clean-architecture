class RefreshTokenRepository {
  async create(refreshTokenEntity) {
    throw new Error("Not implemented");
  }
  async findById(id) {
    throw new Error("Not implemented");
  }
  async findAndCount(where, include, limit, offset) {
    throw new Error("Not implemented");
  }
  async update(refreshTokenEntity, data) {
    throw new Error("Not implemented");
  }
  async delete(refreshTokenEntity) {
    throw new Error("Not implemented");
  }
  async findByToken(token) {
    throw new Error("Not implemented");
  }
}

module.exports = RefreshTokenRepository;
