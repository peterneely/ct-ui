import { combineReducers } from 'redux';
import fuelSavings from './fuelSavingsReducer';
import { routerReducer } from 'react-router-redux';
import fruitsApp from '../fruitsApp/reducers';

const rootReducer = combineReducers({
  fruitsApp,
  fuelSavings,
  routing: routerReducer
});

export default rootReducer;
