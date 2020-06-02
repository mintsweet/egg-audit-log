'use strict';

exports.auditLog = {
  model: {
    name: 'audit_log_custom',
    expand: {
      user: String,
      env: String,
    },
  },
  extra: ctx => {
    return {
      user: 'admin',
      env: ctx.app.config.env,
    };
  },
  mongoose: {
    url: process.env.MONGODB_URL,
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
};

exports.keys = 'audit-log-model';

