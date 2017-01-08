import React from 'react';
import {Route} from 'react-router';

import Layout from './Layout/Layout';

import {
  Home,
  Ciao
} from './Routes/Routes';

export const RoutesTree = (
  <Route component={Layout}>
    <Route path="/">
      {Home}
    </Route>
    <Route path="/ciao/:id">
      {Ciao}
    </Route>
  </Route>
);
