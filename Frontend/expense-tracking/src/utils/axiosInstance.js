import axios from 'axios';
import { BaseUrl } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// A request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } else if (error.response.status === 500) {
        console.error('Internal Server Error');
    }
    if(error.code === 'ECONNABORTED') {
      console.error('Timeout Error');
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;