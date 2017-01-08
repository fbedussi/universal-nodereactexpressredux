import React from 'react';
import {IndexRoute} from 'react-router';

/* eslint no-undef: 0 */
if(__WEBPACK_IS_NODE__) {
  // Used By: matchWebpackChunks
  // platforms/node/Routes/Index/IndexCtrl.js:75
  global.__webpacklazyRouteLoadingRequiredChunks = [];
}

export function lazyRouteLoading(path) {

  return (state, callback) => {
    /* eslint no-undef: 0 */
    if(__WEBPACK_IS_NODE__) {
      global.__webpacklazyRouteLoadingRequiredChunks.push(path);
    }

    return System
      .import(`${path}`)
      .then(exports => {
        callback(null, exports['default']);
      })
      .catch(error => callback(error))
      ;
  };
}


export const Home = (() => {
  const HOME = './Home/Home';

  return (
    <IndexRoute getComponent={lazyRouteLoading(HOME)} />
  );
})();
