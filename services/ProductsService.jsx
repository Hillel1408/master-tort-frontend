import $api from '../http';

export default class ProductsService {
    static async set(values) {
        return $api.post('/products/', values);
    }

    static async get(user) {
        return $api.get(`/products/${user}`);
    }
}
