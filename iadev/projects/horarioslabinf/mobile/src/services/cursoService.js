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

export const cursoService = {
  getCursos: () => {
    return api.get('/cursos');
  },

  getCurso: (id) => {
    return api.get(`/cursos/${id}`);
  },

  createCurso: (curso) => {
    return api.post('/cursos', curso);
  },

  updateCurso: (id, curso) => {
    return api.put(`/cursos/${id}`, curso);
  },

  deleteCurso: (id) => {
    return api.delete(`/cursos/${id}`);
  }
};