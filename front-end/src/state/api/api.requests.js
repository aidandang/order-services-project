import axios from 'axios';
import { UserActionTypes } from '../user/user.types'

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
      dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: res.data.user }) 
    })
    .catch(err => {
      if (err.response) { 
        console.log(err.response.data);
        localStorage.removeItem('token'); 
      }
    });
};

// POST to login
export const logInWithEmailAndPassword = (
  emailAndPassword
) => dispatch => {
  axios
    .post(BASE_API_URL + '/users/login', emailAndPassword)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: res.data.user })
    })
    .catch(err => {
      if (err.response) { 
        console.log(err.response.data)
      }
    })
}

// POST to login
export const registerSubmit = (
  formData
) => dispatch => {
  axios
    .post(BASE_API_URL + '/users/signup', formData)
    .then(res => {
      localStorage.setItem('token', res.data.token);
      dispatch({ type: UserActionTypes.SET_CURRENT_USER, payload: res.data.user })
    })
    .catch(err => {
      if (err.response) { 
        console.log(err.response.data)
      }
    })
}