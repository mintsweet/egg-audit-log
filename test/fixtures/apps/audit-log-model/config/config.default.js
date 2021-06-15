'use strict';

exports.auditLog = {
  model: {
    name: 'audit_log_custom',
    expand: {
      operator: String,
    },
  },
  mongoose: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
};

exports.keys = 'audit-log-model';
