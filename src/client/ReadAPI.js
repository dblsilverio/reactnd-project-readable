const API_URL = 'http://localhost:3001';
const HEADERS = {
    'Accept': 'application/json',
    'Authorization': "App"
}

export default class ReadAPI {

    async categories() {
        const categories = await this.request('/categories');

        if (categories.categories) {
            return categories.categories;
        }

        return [];
    }

    async posts(categoria = null) {
        let uri = '/posts';

        if (categoria) {
            uri = `/${categoria}${uri}`;
        }

        console.log(uri);

        const posts = await this.request(uri);

        if (posts) {
            return posts;
        }

        return [];
    }

    async request(uri, params = []) {
        const response = await fetch(`${API_URL}${uri}`, { headers: HEADERS });
        const responseJson = await response.json();

        return responseJson;
    }

}