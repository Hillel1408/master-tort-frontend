import $api from '../http';

export default class SettingsService {
    static async set(values) {
        return $api.post('/settings', values);
    }
    static async get(user) {
        return $api.get(`/settings/${user}`);
    }
}
