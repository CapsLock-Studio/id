const _ = require('lodash');
const cheerio = require('cheerio');
const axios = require('axios');
const { URL } = require('url');

module.exports = {
  async show(ctx) {
    const alias = _.get(ctx, 'params.id');
    const urlString = `https://www.facebook.com/${alias}`;

    const url = new URL(urlString);

    // The 404 or other network errors would be thrown by axios.
    const { data } = await axios.get(urlString, {
      ...ctx.socks5,
      headers: {
        authority: 'www.facebook.com',
        path: encodeURI(url.pathname),
        method: 'get',
        accpet: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'none',
        'sec-fetch-user': '?1',
        'accept-language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36',
        'cache-control': 'max-age=0',
        'upgrade-insecure-requests': 1,
        'sec-fetch-dest': 'document',
        'sec-fetch-mode': 'navigate',
      },
    });
    const $ = cheerio.load(data);

    const pageletDOM = $('[id^="PagePagesLikedByPageSecondaryPagelet_"]');
    if (pageletDOM) {
      const [, id] = /PagePagesLikedByPageSecondaryPagelet_(\d+)/g.exec(pageletDOM.attr('id')) || [];

      if (id) {
        ctx.body = id;
        return;
      }

      throw new Error('Decode from ID attr failed, the page ID regex needs to be updated');
    }

    throw new Error('Decode from DOM [id^="PagePagesLikedByPageSecondaryPagelet_"] failed, might be unknown page layout');
  },
};
