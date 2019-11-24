# egg-audit-log

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-audit-log.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-audit-log
[travis-image]: https://img.shields.io/travis/mintsweet/egg-audit-log.svg?style=flat-square
[travis-url]: https://travis-ci.org/mintsweet/egg-audit-log
[codecov-image]: https://img.shields.io/codecov/c/github/mintsweet/egg-audit-log.svg?style=flat-square
[codecov-url]: https://codecov.io/github/mintsweet/egg-audit-log?branch=master
[david-image]: https://img.shields.io/david/mintsweet/egg-audit-log.svg?style=flat-square
[david-url]: https://david-dm.org/mintsweet/egg-audit-log
[snyk-image]: https://snyk.io/test/npm/egg-audit-log/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-audit-log
[download-image]: https://img.shields.io/npm/dm/egg-audit-log.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-audit-log

Audit log plugin for egg.js.

## Install

```bash
$ npm i egg-audit-log --save
```

## Configuration

Change `{app_root}/config/plugin.js` to enable `egg-audit-log` plugin:

```javascript
exports.auditLog = {
  enable: true,
  package: 'egg-audit-log',
};
```

## Usage

### Config

```javascript
exports.auditLog = {
  model: {
    name: 'audit_log',
    expansion: {},
    func: (ctx) => ({}),
  },
  mongoose: {
    url: '',
    options: {},
  },
};
```

| Field           | Type     | Remark                                 |
| --------------- | -------- | -------------------------------------- |
| model           | Object   | Config model for audit-log             |
| model.name      | String   | Name for audit-log model               |
| model.expansion | Object   | Expansion for audit-log model          |
| model.func      | Function | Return data to save in audit-log model |
| mongoose        | Object   | Same as egg-audit-log                  |

### Example

```javascript
import { Controller } from 'egg';

class Test extends Controller {
  async create(ctx) {
    await this.app.auditLog.log(ctx, {
      operationType: 'operationType',
      operationContent: 'operationContent',
    });
    return ctx.success();
  }

  async query(ctx) {
    const result = this.app.auditLog.find();
    const total = this.app.auditLog.count();
    return ctx.success({
      data: result,
      total,
    });
  }
}
```

### Middleware Example

```javascript
export default app => {
  const {
    auditLog: {
      middleware: log,
    },
  } = app;

  app.get('/users', log('log type', 'log content'), 'user.query');
}
```

## License

[MIT](LICENSE)
