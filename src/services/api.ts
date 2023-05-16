import axios from 'axios';
import { decrypt } from './crypto';

const token = JSON.parse(decrypt(localStorage.getItem('session')) || '{}').input || '';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers:{
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token 
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
    console.log(error)
    return Promise.reject(error);
  }
);