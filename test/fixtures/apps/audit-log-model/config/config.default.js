'use strict';

exports.auditLog = {
  model: {
    name: 'audit_log_custom',
    expansion: {
      user: String,
      env: String,
    },
    func: ctx => {
      return {
        user: 'admin',
        env: ctx.app.env,
      };
    },
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

