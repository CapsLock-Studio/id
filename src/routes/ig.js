const _ = require('lodash');
const axios = require('axios');

module.exports = {
  async show(ctx) {
    const alias = _.get(ctx, 'params.id');
    const data = await axios.get(`https://www.instagram.com/${alias}?__a=1`, { ...ctx.socks5 });
    const user = _.get(data, 'data.graphql.user.id');

    if (user) {
      ctx.body = user;
    } else {
      ctx.status = 404;
    }
  },
};
