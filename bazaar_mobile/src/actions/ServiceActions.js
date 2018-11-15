import axios from 'axios';
import { FETCH_USER_SERVICES, CREATE_SERVICE, EDIT_SERVICE, DELETE_SERVICE } from './types';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

export const fetchUserServices = userId => dispatch => {
  axios
    .get(`${ROOT_URL}/services/user/${userId}/`)
    .then(response => {
      dispatch({ type: FETCH_USER_SERVICES, payload: response.data.userServices });
    })
    .catch(err => console.log(`Error in fetchUserServices: \n ${err}`));
};

// POSTS to ROOT_URL/services/create
export const createService = service => dispatch => {
  const { name, description, tags } = service;
};
