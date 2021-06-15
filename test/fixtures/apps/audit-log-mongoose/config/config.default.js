'use strict';

exports.auditLog = {

};

exports.mongoose = {
  url: process.env.MONGODB_URL || 'mongodb://localhost:27017/test',
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};

exports.keys = 'audit-log-mongoose';
