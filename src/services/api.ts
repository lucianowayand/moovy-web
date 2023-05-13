import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('session') || ''
  }
});

// middleware to check if the user is authenticated, if not its redirected to login
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem('session');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);