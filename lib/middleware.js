'use strict';

module.exports = auditLog => {
  return (operationType, operationContent) => {
    return async (ctx, next) => {
      await next();
      await auditLog.log(ctx, {
        operationType,
        operationContent,
      });
    };
  };
};
