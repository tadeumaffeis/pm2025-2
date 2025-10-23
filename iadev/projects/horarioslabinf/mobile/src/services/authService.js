import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (username, password) => {
    return api.post('/auth/login', { username, password });
  },

  verifyToken: () => {
    return api.get('/auth/verify');
  },

  refreshToken: () => {
    return api.post('/auth/refresh');
  }
};