import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  FETCH_USER_SERVICES,
  CREATE_SERVICE,
  EDIT_SERVICE,
  DELETE_SERVICE,
  FETCH_ALL_SERVICES,
  FETCH_FAVORITES,
  ADD_FAVORITE,
} from './types';

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
    .post(`${ROOT_URL}/services/create`, { name, description, tags, owner })
    .then(response => {
      dispatch({ type: CREATE_SERVICE, payload: response.data.createdService });
    })
    .catch(err => console.log(`Error in createService: \n ${err}`));
};

// POSTS to ROOT_URL/services/edit
export const editService = service => dispatch => {
  const { name, description, tags, owner, id } = service;

  console.log(`service: ${JSON.stringify(service)}`);

  axios
    .post(`${ROOT_URL}/services/edit`, { name, description, tags, owner, id })
    .then(response => {
      dispatch({ type: EDIT_SERVICE, payload: response.data.result });
      Actions.MyServices({ type: 'reset' });
    })
    .catch(err => console.log(`Error in editService: \n ${err}`));
};

export const deleteService = serviceId => dispatch => {
  axios
    .post(`${ROOT_URL}/services/delete`, { id: serviceId })
    .then(response => {
      dispatch({ type: DELETE_SERVICE, payload: response.data.services });
    })
    .catch(err => console.log(`Error in deleteService: \n ${err}`));

  Actions.MyServices({ type: 'reset' });
};

export const fetchAllServices = () => dispatch => {
  axios
    .get(`${ROOT_URL}/services/`)
    .then(response => {
      dispatch({ type: FETCH_ALL_SERVICES, payload: response.data.services });
    })
    .catch(err => console.log(`Error in fetchAllServices: \n ${err}`));
};

export const fetchFavorites = userId => dispatch => {
  axios
    .get(`${ROOT_URL}/users/${userId}/`)
    .then(response => {
      // console.log(response);
      dispatch({ type: FETCH_FAVORITES, payload: response.data.favoriteServices });
    })
    .catch(err => console.log(`Error in fetchFavorites: \n ${err}`));
};

export const addFavorite = serviceId => dispatch => {
  console.log(`adding favorite: ${serviceId}`);
  axios
    .post(`${ROOT_URL}/users/addFavorite`, { newFavoriteId: serviceId })
    .then(response => {
      dispatch({ type: ADD_FAVORITE, payload: response.data.result });
    })
    .catch(err => console.log(`Error in addFavorite: \n ${err}`));
};
