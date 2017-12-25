import uid from 'uid';

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

    async novoPost(post) {
        const id = uid(16);
        const timestamp = Date.now();

        post.id = id;
        post.timestamp = timestamp;

        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...HEADERS
            },
            body: JSON.stringify(post)
        });

        console.log(post);
        console.log(response);
    }

    async deleteComment(cid){
        const response = await fetch(`${API_URL}/comments/${cid}`, {
            method: 'DELETE',
            headers: HEADERS
        });

        console.log(response);
    }

    async post(id) {
        const post = await this.request(`/posts/${id}`);

        if (post) {
            return post;
        }

        return {};
    }

    async comentariosPost(post_id){
        const comentarios = await this.request(`/posts/${post_id}/comments`);
        console.log(comentarios);
        if (comentarios) {
            return comentarios;
        }

        return [];
    }

    async request(uri, params = []) {
        const response = await fetch(`${API_URL}${uri}`, { headers: HEADERS });
        const responseJson = await response.json();

        return responseJson;
    }

}