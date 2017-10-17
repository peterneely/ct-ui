import * as types from './types';
import * as repo from './repo';

export function getFruits() {
  return dispatch => {
    repo.getFruits().then(fruits => {
      dispatch({ type: types.GET_FRUITS, payload: fruits });
    });    
  };
}

export function selectFruit(index) {
  return { type: types.SELECT_FRUIT, payload: index };
}
