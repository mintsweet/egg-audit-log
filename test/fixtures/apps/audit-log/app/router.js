'use strict';

module.exports = app => {
  const {
    router,
    controller,
    auditLog: {
      middleware: log,
    },
  } = app;

  router.post('/login', controller.auditLog.login);
  router.get('/test', log('log', 'test content'), controller.auditLog.test);
  router.get('/query', controller.auditLog.query);
};
