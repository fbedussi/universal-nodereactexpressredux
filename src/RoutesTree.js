import React from 'react';
import {Route} from 'react-router';

import LayoutAssembler from './LayoutAssembler/LayoutAssemblerConnected';

import {
  Home
} from './Routes/Routes';

export const RoutesTree = (
  <Route component={LayoutAssembler}>
    <Route path="/">
      {Home}
    </Route>
  </Route>
);
