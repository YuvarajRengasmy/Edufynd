import axios from 'axios';
 import { clearStorage } from '../Utils/storage';

// Create Axios instance with base URL
const API = axios.create({ baseURL: 'https://api.edufynd.in/api/' });

// Request interceptor
// API.interceptors.request.use(
//     config => {
//         // Retrieve token from localStorage
//         const token = localStorage.getItem("token");
        
//         // Set basic authentication header (if needed)
//         const basicAuth = `Basic ` + btoa("edufynd:DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF");
//         config.headers.authorization = basicAuth;
        
//         // Attach token to request headers
//         if (token) {
//             config.headers.token = `Bearer ${token}`;
//         }
        
//         return config;
//     },
//     error => {
//         // Handle request errors
//         return Promise.reject(error);
//     }
// );

// Response interceptor
API.interceptors.response.use(
    response => {
        // Handle successful responses
        return response;
    },
    error => {
        // Handle error responses
        if (error.response && error.response.status === 401) {
            // Clear storage and redirect if unauthorized
            clearStorage();
            window.location.pathname = '/';
        }
        return Promise.reject(error);
    }
);

export default API;


