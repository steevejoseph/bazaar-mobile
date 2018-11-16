import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ServiceReducer from './ServiceReducer';

export default combineReducers({
  auth: AuthReducer,
  service: ServiceReducer,
});
