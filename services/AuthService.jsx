import axios from 'axios';

import $api, { API_URL } from '../http';

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
        return axios.get(`${API_URL}/api/refresh`, {
            withCredentials: true,
        });
    }
    static async reset(values) {
        return $api.post('/reset-password', values);
    }
    static async update(values) {
        return $api.post('/update', values);
    }
    static async updatePassword(values) {
        return $api.post('/update-password', values);
    }
    static async updateRushOrder(values) {
        return $api.post('/update-order', values);
    }
}
