import $api from '../http';

export default class RecipeService {
    static async setGroup(values) {
        return $api.post('/recipe-groups', values);
    }
    static async getGroup(userId) {
        return $api.get(`/recipe-groups/${userId}`);
    }
    static async deleteGroup(groupId) {
        return $api.delete(`/recipe-groups/${groupId}`);
    }
    static async setRecipe(values) {
        return $api.post('/recipe', values);
    }
    static async getRecipes(userId) {
        return $api.get(`/recipes/${userId}`);
    }
    static async getRecipe(recipeId) {
        return $api.get(`/recipe/${recipeId}`);
    }
    static async deleteRecipe(recipeId) {
        return $api.delete(`/recipe/${recipeId}`);
    }
    static async updateRecipe(recipeId, values) {
        return $api.patch(`/recipe/${recipeId}`, values);
    }
}
