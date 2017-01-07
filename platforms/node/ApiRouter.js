import {API_PATH} from 'config/env.config';

export function decorate(app) {

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
