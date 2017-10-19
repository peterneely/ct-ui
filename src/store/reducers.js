import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import fruits from '_fruits/reducers';

const rootReducer = combineReducers({
  fruits,
  routing: routerReducer,
});

export default rootReducer;
