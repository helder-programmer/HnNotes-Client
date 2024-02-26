import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const Api = axios.create({ baseURL: 'https://hnnotes-server.onrender.com' });



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