
import assert from 'assert';
import AuditLog from './lib/AuditLog';

module.exports = app => {
  assert(app.config.auditLog, '[egg-auditLog]: The config of auditLog is empty, you should config that.');
  app.auditLog = new AuditLog(app);
};
