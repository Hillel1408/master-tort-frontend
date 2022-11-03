import $api from '../http';

export default class UploadService {
    static async set(values) {
        return $api.post('/upload', values);
    }
}
