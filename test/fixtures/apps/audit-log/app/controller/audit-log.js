'use strict';

const { Controller } = require('egg');

module.exports = class AuditLogController extends Controller {
  async login(ctx) {
    this.app.auditLog.log(ctx);
    this.ctx.body = 'OK';
  }

  async query() {
    const logs = await this.app.auditLog.find();
    const total = await this.app.auditLog.count();

    this.ctx.body = {
      total,
      data: logs,
    };
  }
};
