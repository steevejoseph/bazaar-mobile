import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { fetchJoinableRooms } from './ChatActions';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  SIGNUP_USER,
  LOAD_USER_PROFILE,
  CONNECT_USER_TO_CHAT,
  FETCH_USERS_ROOMS,
} from './types';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

export const emailChanged = text => ({
  type: EMAIL_CHANGED,
  payload: text,
});

export const passwordChanged = text => ({
  type: PASSWORD_CHANGED,
  payload: text,
});

export const loginUser = ({ email, password }) => dispatch => {
  dispatch({ type: LOGIN_USER });

  axios
    .post(`${ROOT_URL}/users/login`, { email, password })
    .then(async response => {
      const { user, token } = response.data;

      await AsyncStorage.setItem('token', token)
        .then(async () => {
          await AsyncStorage.getItem('token')
            .then(tokenFromAsyncStorage => {
              axios.defaults.headers.common.Authorization = `Bearer ${tokenFromAsyncStorage}`;
              loginUserSuccess(dispatch, user, token);
            })
            .catch(() => {
              console.log('Error retrieving token back from AsyncStorage!');
              loginUserFail(dispatch);
            });
        })
        .catch(err => {
          console.log('Error setting token in AsyncStorage!');
          console.log(err);
          loginUserFail(dispatch);
        });
    })
    .catch(err => {
      console.log('Error in axios request in src/actions/AuthActions.js:loginUser()');
      console.log(err);
      loginUserFail(dispatch);
    });
};

export const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user,
  });

  const tokenUrl =
    'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/b90a149b-4af4-4243-9831-b133bff9a54e/token';
  const instanceLocator = 'v1:us1:b90a149b-4af4-4243-9831-b133bff9a54e';

  const chatManager = new ChatManager({
    instanceLocator,
    userId: user._id,
    tokenProvider: new TokenProvider({
      url: tokenUrl,
    }),
  });

  chatManager
    .connect()
    .then(currentUser => {
      // console.log(currentUser);
      dispatch({ type: CONNECT_USER_TO_CHAT, payload: currentUser });

      currentUser
        .getJoinableRooms()
        .then(joinableRooms => {
          dispatch({ type: FETCH_USERS_ROOMS, payload: joinableRooms });
          Actions.Explore({ type: 'reset' });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

export const firstNameChanged = text => ({
  type: FIRST_NAME_CHANGED,
  payload: text,
});

export const lastNameChanged = text => ({
  type: LAST_NAME_CHANGED,
  payload: text,
});

export const signupUser = ({ firstName, lastName, email, password }) => dispatch => {
  dispatch({ type: SIGNUP_USER });

  axios
    .post(`${ROOT_URL}/users/signup`, { firstName, lastName, email, password })
    .then(response => {
      const user = response.data.createdUser;
      const token = response.data.token;

      console.log(`response: ${JSON.stringify(response.data.createdUser)}`);
      signupUserSuccess(dispatch, user, token);
    })
    .catch(err => {
      console.log(err);
      signupUserFail(dispatch);
    });
};

const signupUserSuccess = (dispatch, user, token) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: { user, token },
  });

  Actions.Landing({ type: 'reset' });
};

const signupUserFail = dispatch => {
  dispatch({ type: SIGNUP_USER_FAIL });
};

export const loadUserProfile = userId => dispatch => {
  axios
    .get(`${ROOT_URL}/users/${userId}/`)
    .then(response => {
      dispatch({ type: LOAD_USER_PROFILE, payload: response.data.user });
    })
    .catch(err => {
      console.log(`Error in loadUSerProfile: \n ${err}`);
    });
};
