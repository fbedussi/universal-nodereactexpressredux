const path = require('path');
const webpack = require('webpack');

const {
  BROWSER_BUILD,
  BUILD_ENV_PRODUCTION,
  DLL
} = require('./config/build.config');


const dll = {
  entry: {
    [DLL.essentials]: [
      'babel-polyfill',
      'qs',
      'react',
      'redux',
      'redux-saga',
      'immutable',
      'react-dom',
      'react-redux',
      'react-helmet',
      'react-router',
      'react-router-redux'
    ]
  },

  devtool: 'source-map',

  performance: { hints: false },

  output: {
    filename: '[name].js',
    path: BROWSER_BUILD,
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.join(BROWSER_BUILD, '[name].json')
    })
  ]
};

if(BUILD_ENV_PRODUCTION) {
  const opts = require('./config/webpack/uglify.webpack');

  dll.plugins.push(
    new webpack.optimize.UglifyJsPlugin(opts)
  );
}

module.exports = dll;
