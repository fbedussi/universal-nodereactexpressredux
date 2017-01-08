import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {application} from './Store/application/reducer';

export const reducers = combineReducers({
  application,
  routing
});
