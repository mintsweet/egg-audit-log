module.exports = app => {
  const { router, controller } = app;

  router.post('/login', controller.auditLog.login);
  router.get('/query', controller.auditLog.query);
};
