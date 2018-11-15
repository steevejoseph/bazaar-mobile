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
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  token: '',
  firstName: '',
  lastName: '',
};

export default (state = INITIAL_STATE, action) => {
  // uncomment for play-by-play debugging of action -> reducer pathway.
  // console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      // console.log(`current user: ${action.payload.user}`);
      // console.log(`tokini:${action.payload.token}`);
      return { ...state, ...INITIAL_STATE, user: action.payload.user, token: action.payload.token };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false, password: '' };

    // added by stee.
    case FIRST_NAME_CHANGED:
      return { ...state, firstName: action.payload };

    case LAST_NAME_CHANGED:
      return { ...state, lastName: action.payload };

    case SIGNUP_USER_SUCCESS:
      // console.log(`current user: ${JSON.stringify(action.payload.user)}`);
      // console.log(`tokini:${action.payload.token}`);
      return { ...state, ...INITIAL_STATE, user: action.payload.user, token: action.payload.token };

    case SIGNUP_USER_FAIL:
      return { ...state, error: 'Signup Failed.', loading: false, password: '' };

    case SIGNUP_USER:
      return { ...state, loading: true, error: '' };

    // end

    default:
      return state;
  }
};
