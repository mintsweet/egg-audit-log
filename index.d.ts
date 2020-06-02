import { ConnectionOptions } from 'mongoose';
import { Context } from 'egg';

interface AuditLog {
  log: (
    ctx: Context,
    data?: {
      operationType?: string;
      operationContent?: any;
    }
  ) => Promise<any>;

  find: (conditions: any, projection?: any | null, options?: any | null) => any;
  remove: (conditions: any) => any;
  count: (filter: any) => any;
  getModel: () => any;

  middleware: (
    operationType: string,
    operationContent: string,
    handle?: (ctx: Context) => any
  ) => (ctx, next) => Promise<any>;
}

interface AuditLogConfig {
  model: {
    name?: string;
    expand?: {
      [key: string]: any;
    };
  };
  additional?: (ctx: Context) => {};
  mongoose?: {
    url?: string;
    options?: ConnectionOptions;
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
