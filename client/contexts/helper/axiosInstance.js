// axiosInstance.js
import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});



// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    // If the token exists and the user is logged in, add it to the request headers
    if (token && user /* Add condition to check if the user is logged in */) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // If the user is not logged in, remove the authorization header
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
