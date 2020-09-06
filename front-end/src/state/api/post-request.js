import { batch } from 'react-redux';

import { axiosWithAuth } from './axios-with-auth';
import { BASE_API_URL } from './base-api-url';

import { AlertActionTypes } from '../alert/alert.types';
import { ALERT_COLORS } from '../alert/alert.data';

// POST request.
export const postReq = (
  pathname,
  reqBody,
  fetchSuccess,
  queryStr
) => dispatch => {
  if (queryStr) pathname = pathname + queryStr;

  dispatch({ type: AlertActionTypes.FETCH_START })
  axiosWithAuth()
    .post(BASE_API_URL + pathname, reqBody)
    .then(res => {
      batch(() => {
        dispatch({ type: AlertActionTypes.FETCH_STOP });
        dispatch({ 
          type: fetchSuccess, 
          payload: {
            result: res.data,
            color: ALERT_COLORS.SUCCESS
          } 
        })
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