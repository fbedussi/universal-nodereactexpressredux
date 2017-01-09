const {merge} = require('lodash');
const path = require('path');
const webpack = require('webpack');
const excludeNodeModules = require('webpack-node-externals');
const babelConfig = require('./config/webpack/babel.webpack');
const eslintConfig = require('./config/webpack/eslint.webpack');
const StatsWriterPlugin = require('stats-webpack-plugin');

const {
  ENV_IS_DEVELOPMENT, ENV_IS_PRODUCTION, BUILD_ENV_PRODUCTION,
  MAIN_ENTRY_FILENAME, SRC,
  NODE_DIRNAME, CONFIGS_DIRNAME, BROWSER_DIRNAME, PLATFORMS_DIRNAME,
  CSS_DIRNAME, BROWSER_BUILD, NODE_BUILD,
  PACKAGEJSON_PATH, NODEMODULES_PATH,
  PUBLIC_PATH, DLL, API_PATH, ENV
} = require('./config/build.config');

const {name, version} = require(PACKAGEJSON_PATH);

const CONSTANTS = {
  __WEBPACK_DEFINED_APPVERSION__: JSON.stringify(version),
  __WEBPACK_DEFINED_PUBLICPATH__: JSON.stringify(PUBLIC_PATH),
  __WEBPACK_DEFINED_CSSPATH__: JSON.stringify(`${PUBLIC_PATH}/${CSS_DIRNAME}`),
  __WEBPACK_DEFINED_APPNAME__: JSON.stringify(name),
  __WEBPACK_ENV_PRODUCTION__: JSON.stringify(ENV_IS_PRODUCTION),
  __WEBPACK_DEFINED_ENV__: JSON.stringify(ENV),
  __WEBPACK_DEFINED_API_PATH__: JSON.stringify(API_PATH)
};
const BROWSER_CONSTANTS = merge({}, CONSTANTS, {
  __WEBPACK_IS_BROWSER__: JSON.stringify(true),
  __WEBPACK_IS_NODE__: JSON.stringify(false)
});
const NODE_CONSTANTS = merge({}, CONSTANTS, {
  __WEBPACK_DEFINED_ROOT__: JSON.stringify(__dirname),
  __WEBPACK_IS_BROWSER__: JSON.stringify(false),
  __WEBPACK_IS_NODE__: JSON.stringify(true)
});


const devtool = 'source-map';
const context = SRC;
const filename = `[name].js`;
const chunkFilename = `[id].js`;

const resolve = {
  modules: [
    NODEMODULES_PATH, SRC
  ],
  alias: {
    'config': path.join(__dirname, CONFIGS_DIRNAME)
  }
};

const N_ENTRY = `../${PLATFORMS_DIRNAME}/${NODE_DIRNAME}/${MAIN_ENTRY_FILENAME}.${NODE_DIRNAME}.js`;
const B_ENTRY = `../${PLATFORMS_DIRNAME}/${BROWSER_DIRNAME}/${MAIN_ENTRY_FILENAME}.${BROWSER_DIRNAME}.js`;

const node = {
  devtool, context, resolve,
  name: 'PLATFORM NODE',
  externals: [excludeNodeModules()],
  target: 'node',
  entry: {
    [MAIN_ENTRY_FILENAME]: N_ENTRY
  },
  output: {
    chunkFilename,
    filename,
    path: NODE_BUILD,
    libraryTarget: `commonjs2`
  },
  module: {
    rules: [
      babelConfig.node
    ]
  },
  plugins: [
    new webpack.DefinePlugin(NODE_CONSTANTS),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
};

const browser = {
  devtool, context, resolve,
  name: 'PLATFORM BROWSER',
  externals: {},
  target: 'web',
  entry: {
    [MAIN_ENTRY_FILENAME]: B_ENTRY
  },
  output: {
    filename,
    chunkFilename,
    path: BROWSER_BUILD,
    libraryTarget: `var`,
    publicPath: `${PUBLIC_PATH}/`
  },
  module: {
    rules: [
      babelConfig.browser
    ]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.join(BROWSER_BUILD, `${DLL.essentials}.json`))
    }),
    new webpack.DefinePlugin(BROWSER_CONSTANTS),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new StatsWriterPlugin('stats.json', {
      chunkModules: true,
      exclude: /(node_modules|react)/
    })
  ]
};


if(ENV_IS_DEVELOPMENT) {
  browser.module.rules.unshift(eslintConfig.browser);
  node.module.rules.unshift(eslintConfig.node);
}

if(BUILD_ENV_PRODUCTION) {
  // UglifyJS Does Not Support ES6

  const opts = require('./config/webpack/uglify.webpack');
  const uglify = new webpack.optimize.UglifyJsPlugin(opts);

  browser.plugins.push(uglify);
  // node.plugins.push(uglify);
}

module.exports = [node, browser];
