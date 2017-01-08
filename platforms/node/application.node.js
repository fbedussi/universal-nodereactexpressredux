import express from 'express';
import http from 'http';
import * as Router from './Router';
import winston from 'winston';

import {
  ENV_IS_PRODUCTION, ENV, PUBLIC_PATH,
  PORT, HOST, API_PATH,
  ENV_IS_DEVELOPMENT
} from 'config/env.config';

if(ENV_IS_DEVELOPMENT) {
  require('source-map-support').install();
}

import {
  EJS_PATH
} from 'config/build.config';

const app = express();

const logger = (() => {
  let opts = {
    colorize: false,
    maxsize: 1000000, // 1MB,
    zippedArchive: ENV_IS_PRODUCTION
  };

  const transports = [
    new (require('winston-daily-rotate-file'))(Object.assign({
      filename: 'logs/log'
    }, opts))
  ];

  if(!ENV_IS_PRODUCTION) {
    transports.push(new (winston.transports.Console)({
      prettyPrint: true,
      colorize: true,
      humanReadableUnhandledException: true
    }));
  }

  return new (winston.Logger)({transports});
})();

app
  .set('port', PORT)
  .set('view engine', 'ejs')
  .set('view cache', ENV_IS_PRODUCTION)
  .set('env', ENV)
  .set('views', EJS_PATH)
  .set('logger', logger)
;

module.exports = function application() {

  return Promise
    .resolve(app)

    .then(app => Router.addStaticRoutes(app))
    .then(app => Router.addIndexRoute(app))
    .then(app => Router.addReverseApiProxy(app))
    .then(app => Router.mapWebpackChunks(app))

    .then(app => http.createServer(app))
    .then(server => new Promise((resolve, reject) => (

      server
        .listen(PORT, HOST, (err) => {
          if(err) {
            return reject(err);
          }

          return resolve([{
            production: ENV_IS_PRODUCTION,
            url: `http://${HOST}:${PORT}`,
            public: PUBLIC_PATH,
            api: API_PATH,
            time: Date(),
            cwd: process.cwd(),
            env: ENV
          }, app]);
        })

    )))
    .catch(e => Promise.reject([e, app]))
    ;
};
