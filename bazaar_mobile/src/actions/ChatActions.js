import axios from 'axios';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { CONNECT_USER_TO_CHAT, FETCH_USERS_ROOMS, CREATE_ROOM } from './types';

export const tokenUrl =
  'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b90a149b-4af4-4243-9831-b133bff9a54e/token';
export const instanceLocator = 'v1:us1:b90a149b-4af4-4243-9831-b133bff9a54e';

export const connectChat = userId => dispatch => {
  console.log(userId);
  const chatManager = new ChatManager({
    instanceLocator,
    userId,
    tokenProvider: new TokenProvider({
      url: tokenUrl,
    }),
  });

  chatManager
    .connect()
    .then(currentUser => {
      console.log(currentUser);
      dispatch({ type: CONNECT_USER_TO_CHAT, payload: currentUser });
    })
    .catch(err => console.log(err));
};

export const fetchJoinableRooms = currentUser => dispatch => {
  currentUser
    .getJoinableRooms()
    .then(joinableRooms => {
      dispatch({ type: FETCH_USERS_ROOMS, payload: joinableRooms });
    })
    .catch(err => console.log(err));
};

export const createRoom = (currentUser, serviceOwner, roomName, callback = () => {}) => dispatch => {
  currentUser
    .createRoom({
      name: roomName,
      private: true,
      addUserIds: [`${serviceOwner}`],
    })
    .then(room => {
      dispatch({ type: CREATE_ROOM, payload: room });
      callback({ roomId: room.id, currentUser });
    })
    .catch(err => {
      if (err.statusCode === 400) {
        console.log('User needs to be added to chatkit');
      }
    });
};
