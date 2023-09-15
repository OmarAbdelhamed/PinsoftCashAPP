// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mobil-bank-production.up.railway.app/',
});

export default api;
