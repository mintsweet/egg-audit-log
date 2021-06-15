'use strict';

const assert = require('assert');
const mongoose = require('mongoose');
const AuditLogModel = require('./model/audit_log');

module.exports = class AuditLog {
  constructor(app) {
    this.app = app;
    this.config = app.config.auditLog;

    const mongooseConfig = app.config.mongoose || this.config.mongoose;

    assert(
      mongooseConfig,
      '[egg-auditLog]: The mongoose config is empty, you should config that.'
    );

    this.db = mongoose.createConnection(
      mongooseConfig.url,
      mongooseConfig.options
    );

    const { name, expand } = this.config.model;

    this.model = this.db.model(name, AuditLogModel(expand), name);
  }

  _getMetaData(ctx) {
    const { request } = ctx;
    const { ip, path, method, headers } = request;

    return {
      ip,
      url: path,
      method,
      ua: headers['user-agent'],
    };
  }

  _recordData(data) {
    return this.model.create(data);
  }

  log(ctx, { operationType, operationContent, ...customData } = {}) {
    const metaData = this._getMetaData(ctx);
    return this._recordData({
      ...metaData,
      operationType,
      operationContent,
      ...customData,
    });
  }
};
