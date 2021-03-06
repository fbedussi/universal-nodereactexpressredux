import React from 'react';
import Helmet from 'react-helmet';
import {RouterContext, match as _match} from 'react-router';
import {Provider} from 'react-redux';

import {renderToString as _renderToString} from 'react-dom/server';
import {createStore as _createStore} from 'redux';

import {reducers} from 'Reducers';
import {middlewares, sagaMiddleware} from 'Middlewares';
import {END} from 'redux-saga';

import {RoutesTree as routes} from 'RoutesTree';
import {
  DLL,
  MAIN_ENTRY_FILENAME
} from 'config/build.config';


function renderToString(store, props) {

  return _renderToString(
    <Provider store={store}>
      {<RouterContext {...props} />}
    </Provider>
  );
}
function createStore(initialState = Object.create(null)) {
  return _createStore(
    reducers,
    initialState,
    middlewares
  );
}

export function IndexCtrl(req, res) {
  const logger = req.app.get('logger');
  const store = createStore(Object.create(null));

  return Promise
    .resolve()
    .then(() => {
      let promise = sagaMiddleware.run().done;

      void renderToString(store, res.__RENDERPROPS__);
      store.dispatch(END);

      return promise;
    })
    .then(() => {

      return Object
        .assign(Object.create(null), {
          initialState: store.getState(),
          prerenderedHtml: renderToString(store, res.__RENDERPROPS__),
          Head: Helmet.rewind(),
          DLL,
          MAIN_ENTRY_FILENAME,
          /* eslint no-undef: 0 */
          CSS: __WEBPACK_DEFINED_CSSPATH__,
          ASSETS: __WEBPACK_DEFINED_PUBLICPATH__,
          webpackCurrentChunks: res.__webpackCurrentChunks || []
        })
      ;
    })
    .then(model => res.render('Index/Index', model))
    .catch(e => {
      logger.error('IndexCtrl.error', e);
      return res.status(500).end();
    })
  ;
}

function matchWebpackChunks(chunks = []) {
  let used = global.__webpacklazyRouteLoadingRequiredChunks;
  global.__webpacklazyRouteLoadingRequiredChunks = [];
  if(!used) {
    return [];
  }

  return chunks.reduce((res, c) => {
    let chunk;

    if(~used.indexOf(c.userRequest)) {
      chunk = c;
    }

    return chunk ? res.concat(chunk) : res;
  }, []);
}

export function match(req, res, next) {

  return _match(
    {routes, location: req.url},

    (error, redirectLocation, renderProps) => {
      if(error) {
        return next(error);
      }

      if(redirectLocation) {
        let {pathname, search} = redirectLocation;

        return res.redirect(302, `${pathname}${search}`);
      }

      if(!renderProps) {
        // Do Something with a 404
        return res.status(404).end();
      }

      res.__webpackCurrentChunks = matchWebpackChunks(
        req.app.get('webpackChunksMap'),
        renderProps
      );


      res.__RENDERPROPS__ = renderProps;
      next();
    }
  );
}

