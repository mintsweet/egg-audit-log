/**
 * egg-audit-log default config
 * @member Config#auditLog
 * @property {String} SOME_KEY - some description
 */
exports.auditLog = {
  model: {
    name: 'audit_log',
    expansion: {},
    func: () => {},
  },
  mongoose: {
    url: '',
    options: {},
  },
};
