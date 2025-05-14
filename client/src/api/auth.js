import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Match your backend server port
  withCredentials: true, // Optional, needed if you're using cookies/session
});

export const signup = (formData) => API.post('/auth/register', formData);
export const login = (formData) => API.post('/auth/login', formData);
export const forgotPassword = (formData) => API.post('/auth/reset-password', formData);