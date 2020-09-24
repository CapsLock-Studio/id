const Cache = require('node-cache');

module.exports = new Cache({ stdTTL: 7200 });
