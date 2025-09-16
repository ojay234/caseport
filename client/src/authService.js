// src/authService.js
import API from './api';

// POST /auth/register
export const registerUser = async (data) => {
  const res = await API.post('/auth/register', data);
  return data;   // expected { user, token }
};

// POST /auth/login
export const loginUser = async (data) => {
  const res = await API.post('/auth/login', data);
  return res.data;   // expected { user, token }
};

export const validateEmailToken = async (email, code) => {
  const res = await API.post('/auth/validate-email-token', { email, code });
  return res.data;   // expected { success: boolean, message?: string }
};

export const getUserbyId = async (id) => {
  const res = await API.get(`user/${id}`);
  return res.data
}
