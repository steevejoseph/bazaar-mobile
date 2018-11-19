import axios from 'axios';
import { FETCH_USER_SERVICES, CREATE_SERVICE, EDIT_SERVICE, DELETE_SERVICE, FETCH_ALL_SERVICES } from './types';

const ROOT_URL = 'https://bazaar-backend.herokuapp.com/api';

export const fetchUserServices = userId => dispatch => {
  axios
    .get(`${ROOT_URL}/services/user/${userId}/`)
    .then(response => {
      dispatch({ type: FETCH_USER_SERVICES, payload: response.data.userServices });
    })
    .catch(err => { 
      // console.log(`Error in fetchUserServices: \n ${err}`);
      // console.log(response);
      dispatch({ type: FETCH_USER_SERVICES, payload: [] });
  });
};

// POSTS to ROOT_URL/services/create
export const createService = service => dispatch => {
  const { name, description, tags, owner } = service;

  console.log(`service: ${JSON.stringify(service)}`);

  axios
  .post(`${ROOT_URL}/services/create`, { service })
  .then(response => {
    dispatch({ type: CREATE_SERVICE, payload: response.data.createdService });
  })
  .catch(err => console.log(`Error in createService: \n ${err}`));
};

export const deleteService = serviceId => dispatch => {
  axios
    .post(`${ROOT_URL}/services/delete`, { id: serviceId })
    .then(response => {
      dispatch({ type: DELETE_SERVICE, payload: response.data.services });
    })
    .catch(err => console.log(`Error in deleteService: \n ${err}`));
};

export const fetchAllServices = () => dispatch => {
  axios
    .get(`${ROOT_URL}/services/`)
    .then(response => {
      dispatch({ type: FETCH_ALL_SERVICES, payload: response.data.services });
    })
    .catch(err => console.log(`Error in fetchAllServices: \n ${err}`));
};
