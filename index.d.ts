import * as mongoose from 'mongoose';
import { Context } from 'egg';

interface AuditLog {
  log: (
    ctx: Context,
    data?: {
      operationType?: String,
      operationContent?: String,
      customData?: any;
    },
  ) => any;
  find: (
    conditions: any,
    projection?: any | null, 
    options?: any | null,
  ) => any;
  remove: (conditions: any) => any;
  count: (filter: any) => any;
  getModel: () => any;

  middleware: (
    operationType: string,
    operationContent: string,
    handle?: (ctx: Context) => any,
  ) => void;
}

interface AuditLogConfig {
  model: {
    name?: string,
    expansion?: {
      [key: string]: any;
    },
    func?: (ctx: Context) => ({}),
  };
  mongoose: {
    url?: string,
    options?: mongoose.ConnectionOptions,
  };
}

declare module 'egg' {
  interface Application {
    auditLog: AuditLog;
  }

  interface EggAppConfig {
    auditLog: AuditLogConfig;
  }
}
