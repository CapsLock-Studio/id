const Koa = require('koa');
const compress = require('koa-compress');
const helmet = require('koa-helmet');
const routes = require('@/routes');
const socks5 = require('@/middlewares/socks5');

module.exports = () => {
  const app = new Koa();

  return app
    .use(compress())
    .use(helmet())
    .use(socks5())
    .use(routes());
};
