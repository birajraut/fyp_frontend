import axios from 'axios'

import store from '../redux/store/store'; 

 
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URI,
    // timeout: 50000,
    timeoutErrorMessage: 'server timed out',
    withCredentials: true,
})
 
authApi.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
)
 
authApi.interceptors.response.use(
    (response) => response,
    async (error) => {
        return Promise.reject(error)
    }
)