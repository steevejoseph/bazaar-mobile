// import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from './types';

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
    .then(response => {
      const user = response.data.user;
      const token = response.data.token;

      console.log(`resp: ${JSON.stringify(response.data.user)}`);
      loginUserSuccess(dispatch, user, token);
    })
    .catch(err => {
      console.log(err);
      loginUserFail(dispatch);
    });

  //   firebase
  //     .auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(user => loginUserSuccess(dispatch, user))
  //     .catch(() => {
  //       firebase
  //         .auth()
  //         .createUserWithEmailAndPassword(email, password)
  //         .then(user => loginUserSuccess(dispatch, user))
  //         .catch(() => loginUserFail(dispatch));
  //     });
};

const loginUserFail = dispatch => {
  dispatch({ type: LOGIN_USER_FAIL });
};

// @remember: take a look at this code, it was too easy to write. Should be as simple as adding `token` to the func to be dispatched.
const loginUserSuccess = (dispatch, user, token) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: { user, token },
  });

  Actions.Explore();
};
