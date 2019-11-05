import assert from 'assert';
import mongoose from 'mongoose';
import AuditLogModel from './model/audit_log';

export default class AuditLog {
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

  log(ctx, data) {
    const metaData = this._getMetaData(ctx);
    const { operationType, operationContent, customData } = data;

    return this._recordData({
      ...metaData,
      data,
      operationType,
      operationContent,
      customData,
    });
  }
}
