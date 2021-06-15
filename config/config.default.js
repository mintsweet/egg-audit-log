'use strict';

/**
 * egg-audit-log default config
 * @member Config#auditLog
 * @property {String} SOME_KEY - some description
 */
exports.auditLog = {
  model: {
    name: 'audit_log',
    expand: {},
  },
  mongoose: {
    url: '',
    options: {},
  },
};
