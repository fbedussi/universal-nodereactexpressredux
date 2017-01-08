import express from 'express';

import {
  PUBLIC_FS_PATH,
  PUBLIC_PATH
} from 'config/build.config';

import {
  API_PATH,
  FAVICON_PATH,
  CACHE_MAXAGE,
  ENV_IS_PRODUCTION
} from 'config/env.config';

import {IndexCtrl, match} from './Routes/Index/IndexCtrl';

export function addStaticRoutes(app) {
  const configs = {
    index: false,
    maxAge: ENV_IS_PRODUCTION ? CACHE_MAXAGE : 0
  };

  app
    .use(PUBLIC_PATH, express.static(PUBLIC_FS_PATH, configs))
    .use(PUBLIC_PATH, (req, res) => res.status(404).end())
  ;

  return app;
}


export function addIndexRoute(app) {

  app
    .get('/favicon.ico', (req, res) => res.sendFile(FAVICON_PATH))

    .get('/*',
      match,

      IndexCtrl
    )
  ;

  return app;
}


export function addReverseApiProxy(app) {

  if(API_PATH) {
    let proxy = require('http-proxy').createProxyServer();

    app
      .all(`${API_PATH}/*`, (req, res) => (
        proxy.web(req, res, {target: API_PATH})
      ))
    ;
  }

  return app;
}
