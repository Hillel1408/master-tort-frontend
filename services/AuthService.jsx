import $api from '../http';
import { API_URL } from '../http';
import axios from 'axios';

export default class AuthService {
    static async login(values) {
        return $api.post('/login', values);
    }
    static async registration(values) {
        return $api.post('/registration', values);
    }
    static async logout() {
        return $api.post('/logout');
    }
    static async refresh() {
        return axios.get(`${API_URL}/refresh`, {
            withCredentials: true,
        });
    }
}
