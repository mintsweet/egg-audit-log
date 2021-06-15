'use strict';

const assert = require('assert');
const AuditLog = require('./lib/audit_log');
const AuditLogMiddleware = require('./lib/middleware');

module.exports = app => {
  assert(app.config.auditLog, '[egg-auditLog]: The config of auditLog is empty, you should config that.');
  app.auditLog = new AuditLog(app);
  app.auditLog.middleware = AuditLogMiddleware(app.auditLog);
};
