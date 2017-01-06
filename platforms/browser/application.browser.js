import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, browserHistory, match} from 'react-router';


import {RoutesTree as routes} from 'RoutesTree';
import {reducers} from 'Reducers';
import {middlewares} from 'Middlewares';


const store = createStore(
  reducers,
  window.__INITIAL_STATE__ || Object.create(null),
  middlewares
);

const history = syncHistoryWithStore(browserHistory, store);

const notifyRenderingDone = () => {
  let html = document.documentElement;

  html.classList.remove('application-waiting');
  html.classList.add('application-mounted');
};

match(
  {history, routes},

  (error, redirectLocation, renderProps) => {
    if(error) {
      // TODO: Handle Error
      /* eslint no-console: 0 */
      console.log('BrowserSide Routing Error', error);
    }
    if(redirectLocation) {
      // TODO: Handle Redirection
      /* eslint no-console: 0 */
      console.log('BrowserSide Routing Redirect', redirectLocation);
    }

    return render(
      (
        <Provider store={store}>
          <Router {...renderProps} />
        </Provider>
      ),

      document.querySelector('[application-root]'),
      notifyRenderingDone
    );
  })
;
