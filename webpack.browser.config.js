const StatsPlugin = require('stats-webpack-plugin');
const [, browser] = require('./webpack.config');


browser.plugins.push(
  new StatsPlugin('stats.json', {
    chunkModules: true,
    exclude: /node_modules/
  })
);

module.exports = browser;
