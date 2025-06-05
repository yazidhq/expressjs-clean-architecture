const db = require("../../infrastructure/database/models");
const AuditLog = db.audit_log;

const AuditLogRepository = require("../../domain/repositories/auditLog.repository");

class AuditLogImpl extends AuditLogRepository {
  async create(auditLogEntiry) {
    return await AuditLog(auditLogEntiry);
  }

  async findAndCount(where, include, limit, offset) {
    return await AuditLog.findAndCount({
      where,
      include,
      limit,
      offset,
    });
  }

  async findById(id) {
    return await AuditLog.findOne({ where: { id } });
  }

  async update(auditLogInstance, data) {
    return await auditLogInstance.update(data);
  }

  async truncate() {
    return await AuditLog.truncate();
  }

  async delete(auditLogInstance) {
    return await auditLogInstance.destroy();
  }
}

module.exports = AuditLogImpl;
