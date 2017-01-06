const {merge} = require('lodash');

const presets = ['react'];

const base = {
  exclude: /(node_modules|vendor|build)/,
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    plugins: [
      `transform-function-bind`,
      `transform-class-properties`,
      `transform-decorators`,
      `transform-object-rest-spread`
    ]
  }
};

const node = merge({}, base, {
  options: {
    presets: presets.concat([
      [
        'env',
        {
          targets: {
            node: 6
          }
        }
      ]
    ])
  }
});

const browser = merge({}, base, {
  options: {
    presets: presets.concat([
      [
        'env',
        {
          targets: {
            browsers: [`last 2 versions`, `ie 9`]
          }
        }
      ]
    ])
  }
});

module.exports = {
  base, browser, node,
};
