import initialState from './initialState';
import * as types from './types';

export default function fruitsReducer(state = initialState, action) {
  const { payload, type } = action;
  switch (type) {
    case types.GET_FRUITS:
      return { ...state, fruits: payload };
    default:
      return state;
  }
}
