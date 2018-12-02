import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ServiceReducer from './ServiceReducer';
import ChatReducer from './ChatReducer';

export default combineReducers({
  auth: AuthReducer,
  service: ServiceReducer,
  chat: ChatReducer,
});
