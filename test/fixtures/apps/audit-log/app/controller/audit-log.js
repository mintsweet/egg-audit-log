'use strict';

const { Controller } = require('egg');

module.exports = class AuditLogController extends Controller {
  async login(ctx) {
    this.app.auditLog.log(ctx);
    ctx.body = 'OK';
  }

  async test(ctx) {
    ctx.body = 'OK';
  }

  async query(ctx) {
    const logs = await this.app.auditLog.model.find();
    const total = await this.app.auditLog.model.countDocuments();

    ctx.body = {
      total,
      data: logs,
    };
  }
};
