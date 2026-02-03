import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090'; // Replace with your API base URL

const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',

  },
  withCredentials: true, // important for HTTP-only cookies
});

// Add a request interceptor to include the token
// axiosPrivate.interceptors.request.use(
//   (config) => {
//     const userString = localStorage.getItem('user'); 
//     const user = JSON.parse(userString)
//     if (user) {
//       config.headers.Authorization = `Bearer ${user?.token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosPrivate;