const StatsWriterPlugin = require('stats-webpack-plugin');
const [, browser] = require('./webpack.config');


browser.plugins.push(
  new StatsWriterPlugin('stats.json', {
    chunkModules: true,
    exclude: /(node_modules|react)/
  })
);

module.exports = browser;
