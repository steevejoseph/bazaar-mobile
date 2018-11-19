import { FETCH_USER_SERVICES, FETCH_ALL_SERVICES, CREATE_SERVICE, DELETE_SERVICE } from '../actions/types';

const INITIAL_STATE = {
  services: [],
  userServices: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SERVICES:
      return { ...state, userServices: action.payload };

    case FETCH_ALL_SERVICES:
      return { ...state, services: action.payload };

    case CREATE_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload],
        userServices: [...state.userServices, action.payload],
      };

    case DELETE_SERVICE:
      return { ...state, services: action.payload };

    default:
      return state;
  }
};
