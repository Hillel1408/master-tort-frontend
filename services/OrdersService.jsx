import $api from '../http';

export default class OrdersService {
    static async getOrders(user) {
        return $api.get(`/orders/${user}`);
    }

    static async getKanban(user) {
        return $api.get(`/kanban/${user}`);
    }

    static async setKanban(values) {
        return $api.post('/kanban/', values);
    }

    static async setOrders(values) {
        return $api.post('/orders/', values);
    }

    static async updateOrders(user, values) {
        return $api.patch(`/orders/${user}`, values);
    }
}
