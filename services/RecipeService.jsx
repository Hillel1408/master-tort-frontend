import $api from '../http';

export default class RecipeService {
    static async setGroup(values) {
        return $api.post('/recipe-groups', values);
    }

    static async getGroup(userId) {
        return $api.get(`/recipe-groups/${userId}`);
    }

    static async setRecipe(values) {
        return $api.post('/recipe', values);
    }

    static async getRecipe(userId) {
        return $api.get(`/recipe/${userId}`);
    }
}
