import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Api = axios.create({ baseURL: 'http://192.168.0.24:8000' });



Api.interceptors.request.use(
    async config => {
        const token = await SecureStore.getItemAsync('hn-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


export { Api };