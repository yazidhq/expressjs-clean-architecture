class AuditLogRepository {
  async create(auditLogEntiry) {
    throw new Error("Not implemented");
  }
  async findById(id) {
    throw new Error("Not implemented");
  }
  async findAndCount(where, include, limit, offset) {
    throw new Error("Not implemented");
  }
  async update(auditLogEntiry, data) {
    throw new Error("Not implemented");
  }
  async truncate() {
    throw new Error("Not implemented");
  }
  async delete(auditLogEntiry) {
    throw new Error("Not implemented");
  }
}

module.exports = AuditLogRepository;
