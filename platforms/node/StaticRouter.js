import express from 'express';

import {
  PUBLIC_FS_PATH,
  PUBLIC_PATH
} from 'config/build.config';

import {
  CACHE_MAXAGE,
  ENV_IS_PRODUCTION
} from 'config/env.config';

export function decorate(app) {

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
