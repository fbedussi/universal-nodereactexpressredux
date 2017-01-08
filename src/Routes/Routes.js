import React from 'react';
import {IndexRoute} from 'react-router';

export function lazyRouteLoading(path) {

  return (state, callback) => {
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
