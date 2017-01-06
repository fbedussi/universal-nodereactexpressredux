const path = require('path');

const ROOT = (() => {
  let res;

  try {
    /* eslint no-undef: 0 */
    res = __WEBPACK_DEFINED_ROOT__;
  } catch(e) {
    res = path.join(__dirname, '..');
  }

  return res;
})();
const CONFIGS_PATH = path.join(ROOT, 'configs');

const PACKAGEJSON_PATH = path.join(ROOT, 'package.json');
const NODEMODULES_PATH = path.join(ROOT, 'node_modules');


const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};

const NODE_ENV = (() => {
  let res = (process.env.NODE_ENV || '').toLowerCase();

  if(!res) {
    let prod = process.argv.some(arg => /^-{1,2}p(roduction)?$/i.test(arg));
    if(prod) {
      res = ENVIRONMENTS.PRODUCTION
    }

  }

  return res;
})();


const NODE_PORT = Number(process.env.NODE_PORT || 3000);
const LOCALHOST = 'localhost';

const FAVICON_PATH = path.join(ROOT, 'favicon.ico');
const ENV = NODE_ENV || ENVIRONMENTS.DEVELOPMENT;
const ENV_IS_PRODUCTION = ENV === ENVIRONMENTS.PRODUCTION;
const ENV_IS_DEVELOPMENT = ENV === ENVIRONMENTS.DEVELOPMENT;
const CACHE_MAXAGE = 8.64e+7; // ONE DAY IN MS
const PUBLIC_PATH = '/assets';
const API_PATH = '/api';

const BUILD_ENV_PRODUCTION = ENV_IS_PRODUCTION;

module.exports = {
  CONFIGS_PATH,
  ROOT,
  PACKAGEJSON_PATH,
  NODEMODULES_PATH,
  PORT: NODE_PORT,
  HOST: LOCALHOST,
  ENV,
  ENVIRONMENTS,
  BUILD_ENV_PRODUCTION,
  ENV_IS_PRODUCTION,
  ENV_IS_DEVELOPMENT,
  API_PATH,
  PUBLIC_PATH,
  CACHE_MAXAGE,
  FAVICON_PATH
};
