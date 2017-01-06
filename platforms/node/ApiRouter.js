import {API_PATH} from 'config/env.config';

export function decorate(app) {
  // TODO: Implement Proxy

  app
    .all(`${API_PATH}/*`, (req, res) => res.end())
  ;

  return app;
}
