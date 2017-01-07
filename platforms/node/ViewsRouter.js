import {
  FAVICON_PATH
} from 'config/env.config';

import {IndexCtrl} from './Routes/Index/IndexCtrl';
import {CreateViewModelMiddleware} from './Middlewares/ViewRendering/CreateViewModelMiddleware';
import {RouteMatcherMiddleware} from './Middlewares/ViewRendering/RouteMatcherMiddleware';
import {CreateInitialStateMiddleware} from './Middlewares/ViewRendering/CreateInitialStateMiddleware';

export function decorate(app) {

  app
    .get('/favicon.ico', (req, res) => res.sendFile(FAVICON_PATH))

    .get('/*',
      CreateViewModelMiddleware,
      RouteMatcherMiddleware,
      CreateInitialStateMiddleware,

      IndexCtrl
    )
  ;

  return app;
}
