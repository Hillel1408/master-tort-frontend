import axios from 'axios';
import { parseCookies, setCookie } from 'nookies';

export const API_URL = `http://localhost:5000/api`;
export const IMAGE_URL = `http://localhost:5000`;

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    const cookies = parseCookies();
    config.headers.Authorization = `Bearer ${cookies.token}`;
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status == 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${API_URL}/refresh`, {
                    withCredentials: true,
                });
                setCookie(null, 'token', response.data.accessToken, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: '/',
                });
                return $api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
        throw error;
    }
);

export default $api;
