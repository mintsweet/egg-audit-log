'use strict';

exports.auditLog = {
  mongoose: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  },
};

exports.keys = 'audit-log';
