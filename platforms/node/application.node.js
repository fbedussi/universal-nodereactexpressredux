import express from 'express';
import http from 'http';
import * as Router from './Router';

import {
  ENV_IS_PRODUCTION, ENV, PUBLIC_PATH,
  PORT, HOST, API_PATH
} from 'config/env.config';

import {
  EJS_PATH
} from 'config/build.config';

const app = express();

app
  .set('port', PORT)
  .set('view engine', 'ejs')
  .set('view cache', ENV_IS_PRODUCTION)
  .set('env', ENV)
  .set('views', EJS_PATH)
;

module.exports = function application() {

  return Promise
    .resolve(app)

    .then(app => Router.addStaticRoutes(app))
    .then(app => Router.addIndexRoute(app))
    .then(app => Router.addReverseApiProxy(app))

    .then(app => http.createServer(app))
    .then(app => new Promise((resolve, reject) => (

      app
        .listen(PORT, HOST, (err) => {
          if(err) {
            return reject(err);
          }

          return resolve({
            production: ENV_IS_PRODUCTION,
            url: `http://${HOST}:${PORT}`,
            public: PUBLIC_PATH,
            api: API_PATH,
            time: Date(),
            cwd: process.cwd(),
            env: ENV
          });
        })

    )))
    ;
};
