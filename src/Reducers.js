import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {title} from './Store/title/titleReducer';

export const reducers = combineReducers({
  title,
  routing
});
