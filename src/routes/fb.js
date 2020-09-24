const _ = require('lodash');
const cheerio = require('cheerio');
const axios = require('axios');
const { URL } = require('url');

module.exports = {
  async show(ctx) {
    const alias = _.get(ctx, 'params.id');
    const data = await axios.get(`https://www.facebook.com/${alias}`, { ...ctx.socks5 });
    const $ = cheerio.load(data.data);
    const ios = $('meta[property="al:ios:url"]').attr('content');

    if (ios) {
      const url = new URL(ios);
      const id = url.searchParams.get('id');
      const pathname = url.pathname.split('/').slice(-1).pop();

      ctx.body = _.defaultTo(id, pathname);
    } else {
      ctx.status = 404;
    }
  },
};
