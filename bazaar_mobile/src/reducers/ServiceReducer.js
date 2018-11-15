import { FETCH_USER_SERVICES } from '../actions/types';

const INITIAL_STATE = {
  userServices: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SERVICES:
      // console.log(action.payload);
      return { ...state, userServices: action.payload };
    default:
      return state;
  }
};
