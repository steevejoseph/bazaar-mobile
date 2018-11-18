import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

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
} from './types';

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
    .post('https://bazaar-backend.herokuapp.com/api/users/login', { email, password })
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

  Actions.Explore({ type: 'reset' });
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
    .post('https://bazaar-backend.herokuapp.com/api/users/signup', { firstName, lastName, email, password })
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
