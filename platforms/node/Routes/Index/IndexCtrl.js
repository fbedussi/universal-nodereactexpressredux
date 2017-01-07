import {RouterContext} from 'react-router';
import Helmet from 'react-helmet';
import React from 'react';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import {createStore} from 'redux';
import {reducers} from 'Reducers';
import {middlewares} from 'Middlewares';

export function IndexCtrl(req, res) {

  return Promise
    .resolve(
      createStore(
        reducers,
        res.viewModel.__INITIAL_STATE__ || Object.create(null),
        middlewares
      )
    )
    .then(store => {
      let html;
      let head;
      let state;

      try {
        html = renderToString(
          <Provider store={store}>
            {<RouterContext {...res.viewModel.__RENDERPROPS__} />}
          </Provider>
        );

        head = Helmet.rewind();
        state = store.getState();
      } catch(e) {
        return Promise.reject(e);
      }

      return {html, head, state};
    })
    .then(({html, head, state}) => {

      if(state) {
        res.viewModel.__INITIAL_STATE__ = state;
      }
      if(html) {
        res.viewModel.__PRERENDERED_HTML__ = html;
      }

      if(head) {
        res.viewModel.__HEAD__ = head;
      }
    })
    .then(() => res.viewModel)
    .then(model => res.render('Index/Index', model))
    .catch(e => {
      /* eslint no-console: 0 */
      console.error('IndexCtrl.error', e);
      return res.status(500).end();
    })
  ;
}
