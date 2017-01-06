import express from 'express';
import http from 'http';
import * as BodyParsers from './BodyParsers';
import * as StaticRouter from './StaticRouter';
import * as ApiRouter from './ApiRouter';
import * as ViewsRouter from './ViewsRouter';

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
  .set('views', EJS_PATH)
;


module.exports = function application() {

  return Promise
    .resolve(app)

    .then(app => BodyParsers.decorate(app))
    .then(app => StaticRouter.decorate(app))
    .then(app => ViewsRouter.decorate(app))
    .then(app => ApiRouter.decorate(app))

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
