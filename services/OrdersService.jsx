import $api from '../http';

export default class OrdersService {
    static async getOrders(user) {
        return $api.get(`/orders/${user}`);
    }
}
