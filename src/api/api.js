import axios from 'axios';
import { clearStorage } from '../Utils/storage';

const API = axios.create ({ baseURL: 'http://localhost:4409/api/' });
// const API = axios.create ({ baseURL: 'https://api.edufynd.in/api/' });

API.interceptors.request.use(request => {
    const token = localStorage.getItem("token");
    const basicAuth = `Basic ` + btoa("edufynd:DAF87DSFDSFDSA98FSADKJE324KJL32HFD7FDSFB24343J49DSF");
    request.headers.authorization = basicAuth;
    if (token) {
        request.headers.token = `Bearer ${token}`;
    }
    return request;
}, (error) => {
    return Promise.reject(error);
});

API.interceptors.response.use(response => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        clearStorage();
        window.location.pathname = '/';
    }
    return Promise.reject(error);
});

export default API;
