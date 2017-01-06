const {merge} = require('lodash');

const base = {
  exclude: /(node_modules|vendor|build)/,
  test: /\.js$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  query: {
    emitWarning: true
  }
};
const node = merge({}, base, {});
const browser = merge({}, base, {});

module.exports = {
  base, browser, node
};
