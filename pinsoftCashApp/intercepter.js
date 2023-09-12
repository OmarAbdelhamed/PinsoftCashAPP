import axios from 'axios';
import { useSelector } from 'react-redux';
const api = axios.create({
  baseURL: 'https://mobil-bank-production.up.railway.app/swagger-ui/',
});

const token = useSelector((state) => state.cash.token);
api.interceptors.request.use(
  async (config) => {
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    config.headers[`Accept`] = 'application/json';
    config.headers[`Content-Type`] = 'application/json';

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
