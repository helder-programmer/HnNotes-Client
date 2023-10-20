import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Api = axios.create({ baseURL: 'http://localhost:8000' });



Api.interceptors.request.use(
    config => {
        const token = SecureStore.getItem('hn-token');
        config.headers.authorizaion = token;
        return config;
    },
    error => {
        return Promise.reject(error);
    });


export { Api };