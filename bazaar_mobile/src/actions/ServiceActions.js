import axios from 'axios';
import { FETCH_USER_SERVICES, CREATE_SERVICE, EDIT_SERVICE, DELETE_SERVICE } from './types';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

// sends GET to ROOT_URL/users/:id/services
export const fetchUserServices = userId => dispatch => {
  // headers should* have been set already. if not, 401 will be thrown
  axios
    .get(`${ROOT_URL}/users/${userId}/services`)
    .then(response => console.log(response))
    .catch(err => console.log(err));
  return {
    type: FETCH_USER_SERVICES,
    // payload: response.data.services, <-- I'm guessing that is what it'll be called. Could be wrong.
  };
};

// sends POST to ROOT_URL/services/create
export const createService = service => dispatch => {
  const { name, description, tags } = service;

  // TODO: pull owner details

  axios
    .post(`${ROOT_URL}/services/create`, { name, description, tags /* owner */ })
    .then(response => {
      console.log(response);
      // TODO: finish action/reducer path for create service.
      //   dispatch({
      //     type: CREATE_SERVICE,
      //     payload: response.data.createdService,
      //   });
    })
    .catch(err => console.log(err));
};
