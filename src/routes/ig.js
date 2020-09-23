/* eslint-disable no-eval */
const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  async show(ctx) {
    const alias = _.get(ctx, 'params.id');
    const data = await axios.get(`https://www.instagram.com/${alias}`);
    const $ = cheerio.load(data.data);
    const script = $('script:contains("window._sharedData = ")').html();

    if (script) {
      const window = {};

      // eval script here
      eval(script);

      ctx.body = _.get(window, '_sharedData.entry_data["ProfilePage"][0].graphql.user.id');
    } else {
      ctx.status = 404;
    }
  },
};
