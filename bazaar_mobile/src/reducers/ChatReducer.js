import { CONNECT_USER_TO_CHAT, FETCH_USERS_ROOMS, CREATE_ROOM } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CONNECT_USER_TO_CHAT:
      // console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload,
      };
    case FETCH_USERS_ROOMS:
      return {
        ...state,
        joinableRooms: action.payload,
      };
    case CREATE_ROOM:
      return {
        ...state,
        createdRoom: action.payload,
      };
    default:
      return state;
  }
}
