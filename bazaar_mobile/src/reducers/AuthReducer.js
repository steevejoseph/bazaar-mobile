import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  token: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      console.log(`tokini:${action.payload.token}`);
      return { ...state, ...INITIAL_STATE, user: action.payload.user, token: action.payload.token };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', loading: false, password: '' };
    default:
      return state;
  }
};
