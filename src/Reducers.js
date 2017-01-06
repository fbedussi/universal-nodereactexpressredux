import {combineReducers} from 'redux';

import {routerReducer as routing} from 'react-router-redux';
import {linksStylesheet} from './Reducers/linksStylesheet/linksStylesheetReducers';

export const reducers = combineReducers({
  linksStylesheet,
  routing
});
