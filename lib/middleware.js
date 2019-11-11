'use strict';

module.exports = auditLog => {
  return (operationType, operationContent, handle) => {
    return async (ctx, next) => {
      await next();

      let customData = {};

      if (handle) {
        customData = handle(ctx);
      }

      await auditLog.log(ctx, {
        operationType,
        operationContent,
        customData,
      });
    };
  };
};
