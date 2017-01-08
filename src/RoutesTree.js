import React from 'react';
import {Route} from 'react-router';

import LayoutAssembler from './LayoutAssembler/LayoutAssembler';

import {
  Home,
  Ciao
} from './Routes/Routes';

export const RoutesTree = (
  <Route component={LayoutAssembler}>
    <Route path="/">
      {Home}
    </Route>
    <Route path="/ciao">
      {Ciao}
    </Route>
  </Route>
);
