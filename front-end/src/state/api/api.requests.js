import axios from 'axios';

import { UserActionTypes } from '../user/user.types';
import { TabbarActionTypes } from '../tabbar/tabbar.types';

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

// GET user authorization status.
export const getAuthStateChanged = () => dispatch => {
  axiosWithAuth()
    .get(BASE_API_URL + '/users/auth')
    .then(res => {
      dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: res.data.token }) 
    })
    .catch(err => {
      if (err.response) { 
        console.log(err.response.data);
        dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: null })
        localStorage.removeItem('token'); 
      }
    });
};

// POST user authorization.
export const postUserAuthReq = (
  endpoint,
  reqBody,
  page
) => dispatch => {
  dispatch({ 
    type: TabbarActionTypes.SET_TABBAR_MESSAGE, 
    payload: {
      page,
      message: { 
        style: 'text-primary', 
        text: '...Fetching'
      } 
    }
  })
  axiosWithAuth()
    .post(BASE_API_URL + endpoint, reqBody)
    .then(res => {
      localStorage.setItem('token', res.data.token) 
      dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: res.data.token })
    })
    .catch(err => {
      dispatch({ 
        type: TabbarActionTypes.SET_TABBAR_MESSAGE, 
        payload: {
          page,
          message: {
            style: 'text-danger',
            text: err.response ? err.response.data.message : 'ERROR: Cannot connect to the server.'
          }
        }
      });
    });
};

// POST request.
export const postReq = (
  endpoint,
  reqBody,
  page,
  actionType
) => dispatch => {
  dispatch({ 
    type: TabbarActionTypes.SET_TABBAR_MESSAGE, 
    payload: {
      page,
      message: { 
        style: 'text-primary', 
        text: '...Fetching'
      } 
    }
  })
  axiosWithAuth()
    .post(BASE_API_URL + endpoint, reqBody)
    .then(res => {
      dispatch({ 
        type: actionType, 
        payload: {
          page,
          message: {
            style: 'text-success',
            text: res.data.message
          },
          result: res.data
        } 
      })
    })
    .catch(err => {
      dispatch({ 
        type: TabbarActionTypes.SET_TABBAR_MESSAGE, 
        payload: {
          page,
          message: {
            style: 'text-danger',
            text: err.response ? err.response.data.message : 'ERROR: Cannot connect to the server.'
          }
        }
      });
    });
};