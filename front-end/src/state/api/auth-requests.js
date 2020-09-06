import { batch } from 'react-redux';

import { axiosWithAuth } from './axios-with-auth';
import { BASE_API_URL } from './base-api-url';

import { UserActionTypes } from '../user/user.types';
import { AlertActionTypes } from '../alert/alert.types';
import { ALERT_COLORS } from '../alert/alert.data';

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
  reqBody
) => dispatch => {
  dispatch({ type: AlertActionTypes.FETCH_START })
  axiosWithAuth()
    .post(BASE_API_URL + endpoint, reqBody)
    .then(res => {
      localStorage.setItem('token', res.data.token) 
      batch(() => {
        dispatch({ type: AlertActionTypes.FETCH_STOP });
        dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: res.data.token })
      })
    })
    .catch(err => {
      dispatch({ 
        type: AlertActionTypes.SET_ALERT_MESSAGE, 
        payload: err.response 
          ? { 
            result: err.response.data,
            color: ALERT_COLORS.DANGER 
          }
          : { 
            result: { message: 'ERROR: COULD NOT CONNECT TO THE SERVER.' },
            color: ALERT_COLORS.DANGER  
          } 
      })  
    });
};