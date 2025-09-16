// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://caseport.onrender.com',
  headers: { 'Content-Type': 'application/json' }
});

// Attach the token (if we already have one) before every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
