import * as types from './types';
import * as repo from './repo';

export function getFruits() {
  return dispatch => {
    repo.getFruits().then(fruits => {
      dispatch({ type: types.GET_FRUITS, payload: fruits });
    });    
  };
}

export function selectItem(index) {
  return { type: types.SELECT_ITEM, payload: index };
}
