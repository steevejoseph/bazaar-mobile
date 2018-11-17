import { FETCH_USER_SERVICES, FETCH_ALL_SERVICES } from '../actions/types';

const INITIAL_STATE = {
  services: null,
  userServices: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SERVICES:
      return { ...state, userServices: action.payload };

    case FETCH_ALL_SERVICES:
      return { ...state, services: action.payload };

    default:
      return state;
  }
};
