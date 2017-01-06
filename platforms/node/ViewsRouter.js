import {
  FAVICON_PATH
} from 'config/env.config';

import {IndexCtrl} from './Routes/Index/IndexCtrl';
import {CreateViewModelMiddleware} from './Middlewares/CreateViewModelMiddleware';
import {ReactReduxRendererMiddleware} from './Middlewares/ReactReduxRendererMiddleware';

export function decorate(app) {

  app
    .get('/favicon.ico', (req, res) => res.sendFile(FAVICON_PATH))

    .get('/*',
      CreateViewModelMiddleware,
      ReactReduxRendererMiddleware,

      IndexCtrl
    )
  ;

  return app;
}
