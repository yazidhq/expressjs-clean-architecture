const AuditLogImpl = require("../../infrastructures/repositories/auditLog.repository.impl");

const auditLog = (action, tableName) => (req, res, next) => {
  res.on("finish", async () => {
    const { recordId, oldValue, newValue } = res.locals.audit || {};

    if (!recordId && action !== "truncateUsers") return;

    try {
      await AuditLogImpl.create({
        userId: req.user?.id || null,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        action,
        tableName,
        recordId,
        oldValue,
        newValue,
      });
    } catch (error) {
      console.error("Failed to write audit log", error);
    }
  });

  next();
};

module.exports = auditLog;
