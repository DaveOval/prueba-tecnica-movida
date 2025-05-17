import axios from 'axios';

//const API_URL = import.meta.env.VITE_API_URL;

const API_URL = 'http://3.128.221.178:3000/api/';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
