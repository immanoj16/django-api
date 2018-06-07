import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (user, history) => dispatch => {
  axios.post('/api/users/register/', user)
    .then(res => history.push('/login'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const loginUser = user => dispatch => {
  axios.post('/api/users/login/', user)
    .then(res => {
      // save to local storage
      const { token } = res.data;
      // set token to local storage
      localStorage.setItem('jwtToken', token);
      // set token to Auth header
      setAuthToken(token);
      // decode the jwt token
      const decoded = jwt_decode(localStorage.jwtToken);
      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response
      })
    })

  /*$.ajax({
    type: 'POST',
    url: '/api/obtain-auth-token/',
    data: user,
    success: function(res){
      console.log(res)
    }
  })*/
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
};

export const logoutUser = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken');
  // Remove auth token for future use
  setAuthToken(false);
  // Remove user from store
  dispatch(setCurrentUser({}));
}
