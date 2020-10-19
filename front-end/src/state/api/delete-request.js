// dependencies
import axios from 'axios';
// firebase
import { auth } from '../../firebase/firebase.utils';
// redux
import { batch } from 'react-redux';
import { IsFetchingActionTypes } from '../is-fetching/is-fetching.types';
import { AlertActionTypes } from '../alert/alert.types';

import { BASE_API_URL } from './base-api-url';

const handleErrorMesg = (err) => {
  const payload = {}

  if (err.response) { 
    payload.message = err.response.data.message 
  } else {
    payload.message = 'Error: Could not connect to the server.'
  }
  
  payload.color = 'danger';
  return payload
}

// GET request.
export const deleteReq = (
  pathname,
  fetchSuccess
) => dispatch => {
  dispatch({ type: IsFetchingActionTypes.FETCH_START })
  auth.currentUser.getIdToken()
    .then(token => {
      axios
        .create({ headers: { Authorization: `Bearer ${token}` } })
        .delete(BASE_API_URL + pathname)
        .then(res => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ type: fetchSuccess, payload: res.data })
          })
        })
        .catch(err => {
          batch(() => {
            dispatch({ type: IsFetchingActionTypes.FETCH_STOP });
            dispatch({ type: AlertActionTypes.SET_ALERT_MESSAGE, payload: handleErrorMesg(err) })  
          })
        });
    })
    .catch(err => console.log(err));
}