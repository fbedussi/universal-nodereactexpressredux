import React from 'react';
import Helmet from 'react-helmet';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {RouterContext, match} from 'react-router';

import {RoutesTree as routes} from 'RoutesTree';
import {reducers} from 'Reducers';
import {middlewares} from 'Middlewares';

export function ReactReduxRendererMiddleware(req, res, next) {

  return match(
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

      return new Promise((resolve, reject) => {
        let store;

        try {
          store = createStore(
            reducers,
            res.viewModel.__INITIAL_STATE__ || Object.create(null),
            middlewares
          );
        } catch(e) {

          return reject(e);
        }

        return resolve(store);
      })
        .then(store => {
          let html;
          let head;

          try {
            html = renderToString(
              <Provider store={store}>
                {<RouterContext {...renderProps} />}
              </Provider>
            );

            head = Helmet.rewind();
          } catch(e) {

            return Promise.reject(e);
          }

          return {html, head};
        })
        .then(({html, head}) => {

          if(html) {
            res.viewModel.__PRERENDERED_HTML__ = html;
          }

          if(head) {
            res.viewModel.__HEAD__ = head;
          }

          return next();
        })
        .catch(error => next(error))
        ;
    }
  );
}
