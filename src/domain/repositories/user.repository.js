class UserRepository {
  async create(userEntity) {
    throw new Error("Not implemented");
  }
  async findAndCount(where, include, limit, offset) {
    throw new Error("Not implemented");
  }
  async findById(id) {
    throw new Error("Not implemented");
  }
  async update(userEntity, data) {
    throw new Error("Not implemented");
  }
  async delete(userEntity) {
    throw new Error("Not implemented");
  }
  async findByUsername(username) {
    throw new Error("Not implemented");
  }
  async findByEmail(email) {
    throw new Error("Not implemented");
  }
  async truncateNonSuperadmin() {
    throw new Error("Not implemented");
  }
}

module.exports = UserRepository;
