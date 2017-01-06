const {merge} = require('lodash');
const path = require('path');

const {
  ENV_IS_PRODUCTION,
  ENV_IS_DEVELOPMENT,
  NODEMODULES_PATH,
  PACKAGEJSON_PATH,
  ROOT,
  PUBLIC_PATH
} = require('./env.config');

const CONFIGS_DIRNAME = 'config';
const SRC_DIRNAME = 'src';
const PLATFORMS_DIRNAME = 'platforms';
const BUILD_DIRNAME = 'build';
const NODE_DIRNAME = 'node';
const BROWSER_DIRNAME = 'browser';
const PUBLIC_FS_DIRNAME = path.join(BUILD_DIRNAME, BROWSER_DIRNAME);

const SRC = path.join(ROOT, SRC_DIRNAME);
const BUILD = path.join(ROOT, BUILD_DIRNAME);
const NODE_SRC = path.join(ROOT, PLATFORMS_DIRNAME, NODE_DIRNAME);
const NODE_BUILD = path.join(BUILD, NODE_DIRNAME);
const BROWSER_SRC = path.join(ROOT, PLATFORMS_DIRNAME, BROWSER_DIRNAME);
const BROWSER_BUILD = path.join(BUILD, BROWSER_DIRNAME);

const EJS_PATH = path.join(NODE_SRC, 'Routes');

const PUBLIC_FS_PATH = path.join(ROOT, PUBLIC_FS_DIRNAME);
const MAIN_ENTRY_FILENAME = 'application';
const DLL = {
  essentials: '__essentialsLibraries__' // must be a valid variable name
};

/* EXPORT BUILD CONFIGURATION, END EDITS HERE. */

const configs = merge(
  Object.create(null),

  {
    ENV_IS_PRODUCTION,
    ENV_IS_DEVELOPMENT,

    ROOT,
    CONFIGS_DIRNAME,
    NODEMODULES_PATH,
    PACKAGEJSON_PATH,

    SRC,
    BUILD,
    BROWSER_SRC,
    NODE_SRC,
    NODE_BUILD,
    BROWSER_BUILD,
    EJS_PATH,

    SRC_DIRNAME,
    BUILD_DIRNAME,
    NODE_DIRNAME,
    BROWSER_DIRNAME,
    PLATFORMS_DIRNAME,

    PUBLIC_FS_DIRNAME,
    PUBLIC_FS_PATH,
    PUBLIC_PATH,
    MAIN_ENTRY_FILENAME,
    DLL
  }
);


if(ENV_IS_PRODUCTION) {
  merge(configs, require('./build.production.config'));
}

module.exports = configs;
