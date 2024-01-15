
import axios from 'axios';

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

apiService.interceptors.request.use((config) => {
  const authToken = localStorage.getItem('authToken');
  if (authToken) {
    config.headers['token'] = authToken;
  }
  return config;
});

export default apiService;
