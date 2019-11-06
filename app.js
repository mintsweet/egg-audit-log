
const assert = require('assert');
const AuditLog = require('./lib/AuditLog');

module.exports = app => {
  assert(app.config.auditLog, '[egg-auditLog]: The config of auditLog is empty, you should config that.');
  app.auditLog = new AuditLog(app);
};
