import { ConnectionOptions, Model } from 'mongoose';
import { Context } from 'egg';

interface AuditLog {
  model: Model<any>;

  log: (
    ctx: Context,
    data?: {
      operationType?: string;
      operationContent?: string;
      customData?: any;
    }
  ) => Promise<any>;

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
