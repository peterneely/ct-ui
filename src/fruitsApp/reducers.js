import initialState from './initialState';
import * as types from './types';

export default function fruitsReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.GET_PEOPLE:
      return { ...state, people: payload };
    case types.SELECT_FRUIT:
      return { ...state, selectedFruit: payload };
    default:
      return state;
  }
}
