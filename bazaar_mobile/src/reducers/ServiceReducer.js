import {
  FETCH_USER_SERVICES,
  FETCH_ALL_SERVICES,
  CREATE_SERVICE,
  EDIT_SERVICE,
  DELETE_SERVICE,
  FETCH_FAVORITES,
  ADD_FAVORITE,
} from '../actions/types';

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

    case EDIT_SERVICE:
      return { ...state };

    case DELETE_SERVICE:
      return { ...state, services: action.payload };

    case FETCH_FAVORITES:
      return { ...state, favorites: action.payload };

    case ADD_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    default:
      return state;
  }
};
