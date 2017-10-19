import * as types from './types';
import * as repo from './repo';

export function getPeople() {
  return dispatch => {
    repo.getPeople().then(people => {
      dispatch({ type: types.GET_PEOPLE, payload: people });
    });    
  };
}

export function selectFruit(fruitName) {
  return (dispatch, getState) => {
    const { fruitsApp: { selectedFruit }} = getState();
    const reselected = selectedFruit && selectedFruit === fruitName;
    dispatch({ type: types.SELECT_FRUIT, payload: reselected ? null : fruitName });
  };
}
