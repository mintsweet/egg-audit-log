const assert = require('assert');
const mongoose = require('mongoose');
const AuditLogModel = require('./model/audit_log');

module.exports = class AuditLog {
  constructor(app) {
    this.app = app;
    this.config = app.config.auditLog;

    const mongooseConfig = app.config.mongoose || this.config.mongoose;
    assert(mongooseConfig, '[egg-auditLog]: The mongoose config is empty, you should config that.');
    this.db = mongoose.createConnection(mongooseConfig.url, mongooseConfig.options);

    const modelConfig = this.config.model;
    this.AuditLogModel = this.db.model(modelConfig.name, AuditLogModel(modelConfig.expansion));
  }

  _getMetaData(ctx) {
    const { request } = ctx;
    const { ip, path, method, headers } = request;

    let otherData = {};

    if (this.config.model.func) {
      otherData = this.config.model.func(ctx);
    }

    return {
      ip,
      url: path,
      method,
      ua: headers['user-agent'],
      ...otherData,
    };
  }

  _recordData(data) {
    return this.AuditLogModel.create(data);
  }

  log(ctx, data = {}) {
    const metaData = this._getMetaData(ctx);
    const { operationType, operationContent, customData } = data;

    return this._recordData({
      ...metaData,
      operationType,
      operationContent,
      customData,
    });
  }

  find(query, select, options) {
    return this.AuditLogModel.find(query, select, options);
  }

  remove(query, options) {
    return this.AuditLogModel.deleteMany(query, options);
  }

  getModel() {
    return this.AuditLogModel;
  }
};
