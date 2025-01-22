import axios from 'axios';
import pb from './pocketbase';

const api = axios.create({
  baseURL: process.env.VITE_POCKETBASE_URL,
});

api.interceptors.request.use((config) => {
  const csrfToken = pb.authStore.token;
  const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('csrf=')).split('=')[1];
  config.headers['X-CSRF-Token'] = csrfToken;
  config.headers['X-CSRF-Cookie'] = csrfCookie;
  return config;
});

export default api;
