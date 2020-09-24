const _ = require('lodash');
const axios = require('axios');
const Socks5Agent = require('axios-socks5-agent');
const cache = require('@/libs/cache');

module.exports = () => async (ctx, next) => {
  if (!cache.has('socks5')) {
    const response = await axios.get('https://socks5.capslock.tw');
    const socks5 = response.data.split('\n').filter(Boolean);

    // set socks
    cache.set('socks5', socks5);
  }

  const proxies = cache.get('socks5');
  const [host, port] = _.sample(proxies).split(':');

  ctx.socks5 = new Socks5Agent({ host, port });

  await next();
};
