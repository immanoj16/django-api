import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // Apply to every headers
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;