const compose = require('koa-compose');
const fb = require('@/routes/fb');
const ig = require('@/routes/ig');
const joi = require('koa-joi-rest');

module.exports = () => compose(
  [
    joi(
      {
        resource: 'fb',
        handlers: fb,
      },
    ),
    joi(
      {
        resource: 'ig',
        handlers: ig,
      },
    ),
  ],
);
