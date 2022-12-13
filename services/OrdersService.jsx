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

    static async setOrders(user, values) {
        return $api.patch(`/orders/${user}`, values);
    }

    static async getOrder(id) {
        return $api.get(`/order/${id}`);
    }

    static async updateOrders(user, values) {
        return $api.patch(`/update-orders/${user}`, values);
    }

    static async calculationOrder(values) {
        return $api.post('/calculation/', values);
    }

    static async updateTotal(user, values) {
        return $api.patch(`/update-total/${user}`, values);
    }
}
