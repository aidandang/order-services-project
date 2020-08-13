import { axiosWithAuth } from './axiosAuth';
import { setPageActive } from '../../actions/ui';
import { batch } from 'react-redux';

export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

// POST action to send user username and password to get a JWT.
export const postLogin = (pathname, credentials, fetchAction, history, historyPath) => dispatch => {
  dispatch({ type: fetchAction.FETCH_START});
  axiosWithAuth()
    .post(BASE_API_URL + pathname, credentials)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('_id', res.data.user._id);
      localStorage.setItem('name', res.data.user.name);
      history.push(historyPath);
    })
    .catch(err => dispatch({ type: fetchAction.FETCH_FAIL, payload: err.response }));
}

// PATCH action to send password and password confirmed to get a JWT.
export const patchPassword = (pathname, credentials, fetchAction, history, historyPath) => dispatch => {
  dispatch({ type: fetchAction.FETCH_START});
  axiosWithAuth()
    .patch(BASE_API_URL + pathname, credentials)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('_id', res.data.user._id);
      localStorage.setItem('name', res.data.user.name);
      history.push(historyPath);
    })
    .catch(err => dispatch({ type: fetchAction.FETCH_FAIL, payload: err.response }));
}

// GET action
export const getData = (pathname, search, fetchAction, page = {}) => dispatch => {
  dispatch({ type: fetchAction.FETCH_START });
  axiosWithAuth()
    .get(BASE_API_URL + pathname + search)
    .then(res => { 
      batch(() => {
        dispatch({ type: fetchAction.FETCH_SUCCESS, payload: res.data });
        dispatch(setPageActive(page));
      })
    })
    .catch(err => dispatch({ type: fetchAction.FETCH_FAIL, payload: err.response }));
};

// POST action
export const postData = (pathname, reqBody, fetchAction, page = {}) => dispatch => {
  dispatch({ type: fetchAction.FETCH_START });
  axiosWithAuth()
    .post(BASE_API_URL + pathname, reqBody)
    .then(res => { 
      batch(() => {
        dispatch({ type: fetchAction.FETCH_SUCCESS, payload: res.data });
        dispatch(setPageActive(page));
      })
    })
    .catch(err => dispatch({ type: fetchAction.FETCH_FAIL, payload: err.response }));
};

// PATCH action
export const patchData = (pathname, reqBody, fetchAction, page = {}) => dispatch => {
  dispatch({ type: fetchAction.FETCH_START });
  axiosWithAuth()
    .patch(BASE_API_URL + pathname, reqBody)
    .then(res => { 
      batch(() => {
        dispatch({ type: fetchAction.FETCH_SUCCESS, payload: res.data });
        dispatch(setPageActive(page));
      })
    })
    .catch(err => dispatch({ type: fetchAction.FETCH_FAIL, payload: err.response }));
};

// DELETE action
export const deleteData = (pathname, fetchAction, page = {}) => dispatch => {
  dispatch({ type: fetchAction.FETCH_START });
  axiosWithAuth()
    .delete(BASE_API_URL + pathname)
    .then(res => { 
      batch(() => {
        dispatch({ type: fetchAction.FETCH_SUCCESS, payload: res.data });
        dispatch(setPageActive(page));
      })
    })
    .catch(err => dispatch({ type: fetchAction.FETCH_FAIL, payload: err.response }));
};