import axios from 'axios';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: 'https://artichub-backend.onrender.com'
  // baseURL: 'http://localhost:4444'
});

// Request interceptor - add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('ahub-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor - handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;