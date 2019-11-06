'use strict';

exports.auditLog = {

};

exports.mongoose = {
  url: process.env.MONGODB_URL,
  options: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
};

exports.keys = 'audit-log-mongoose';
