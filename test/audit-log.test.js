'use strict';

const mock = require('egg-mock');

describe('test/audit-log.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/audit-log-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, auditLog')
      .expect(200);
  });
});
