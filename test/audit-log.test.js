'use strict';

const assert = require('assert');
const mock = require('egg-mock');

describe('test/audit-log.test.js', () => {
  // test audit-log
  describe('audit-log', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/audit-log',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);
    afterEach(async () => {
      await app.auditLog.remove();
    });

    it('should has app auditLog property', async () => {
      assert(app.auditLog);
      assert(typeof app.auditLog.log === 'function');
      assert(typeof app.auditLog.find === 'function');
      assert(typeof app.auditLog.remove === 'function');
      assert(typeof app.auditLog.count === 'function');
      assert(typeof app.auditLog.getModel === 'function');
    });

    it('should get data from create', async () => {
      app.mockCsrf();

      await app.httpRequest()
        .post('/login')
        .expect('OK')
        .expect(200);

      const { body: { total, data } } = await app.httpRequest()
        .get('/query')
        .expect(200);

      assert(total === 1);
      assert(data[0].url === '/login');
    });

    it('should get data from middleware', async () => {
      app.mockCsrf();

      await app.httpRequest()
        .get('/test')
        .expect('OK')
        .expect(200);

      const { body: { total, data } } = await app.httpRequest()
        .get('/query')
        .expect(200);

      assert(total === 1);
      assert(data[0].url === '/test');
      assert(data[0].operationType === 'log');
      assert(data[0].operationContent === 'test content');
    });

    it('should load promise', () => {
      const query = app.auditLog.find({});
      assert.equal(query.exec().constructor, Promise);
    });
  });

  // test audit-log-model
  describe('audit-log-model', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/audit-log-model',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);
    afterEach(async () => {
      await app.auditLog.remove();
    });

    it('should get data from create', async () => {
      app.mockCsrf();

      await app.httpRequest()
        .post('/login')
        .expect('OK')
        .expect(200);

      const { body } = await app.httpRequest()
        .get('/query')
        .expect(200);

      assert(body[0].operationType === 'login');
    });

    it('should get other data from config model func return', async () => {
      app.mockCsrf();

      await app.httpRequest()
        .post('/login')
        .expect('OK')
        .expect(200);

      const { body } = await app.httpRequest()
        .get('/query')
        .expect(200);

      assert(body[0].user === 'admin');
      assert(body[0].env === 'unittest');
    });
  });

  // test audit-log-mongoose
  describe('audit-log-mongoose', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/audit-log-mongoose',
      });
      return app.ready();
    });

    after(() => app.close());
    afterEach(mock.restore);

    it('should has app auditLog property', async () => {
      assert(app.auditLog);
      assert(typeof app.auditLog.log === 'function');
      assert(typeof app.auditLog.find === 'function');
      assert(typeof app.auditLog.remove === 'function');
      assert(typeof app.auditLog.getModel === 'function');
    });
  });
});
