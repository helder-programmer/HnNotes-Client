import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Api = axios.create({ baseURL: 'http://172.60.7.91:8000' });



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