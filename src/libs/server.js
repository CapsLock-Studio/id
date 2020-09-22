const Koa = require('koa');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const routes = require('@/routes');

module.exports = () => {
  const app = new Koa();

  return app
    .use(compress())
    .use(helmet())
    .use(routes());
};
