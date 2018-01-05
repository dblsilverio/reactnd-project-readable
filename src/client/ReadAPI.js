import uid from 'uid';

export const TYPE_POST = "POST";
export const TYPE_COMMENT = "COMMENT";

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

        const posts = await this.request(uri);

        if (posts) {
            return posts;
        }

        return [];
    }

    async novoPost(post) {

        let method = 'POST';
        let uri = `${API_URL}/posts`;
        if (post.id) {
            method = 'PUT';
            const { id, title, body } = post;

            post = { id, title, body };
            uri += `/${id}`;
        } else {
            const id = uid(16);
            const timestamp = Date.now();

            post.id = id;
            post.timestamp = timestamp;
            post.voteScore = 1;
            post.new = true;
        }

        await fetch(uri, {
            method: method,
            headers: {
                'Content-type': 'application/json',
                ...HEADERS
            },
            body: JSON.stringify(post)
        });


    }

    async deleteComment(cid) {
        const response = await fetch(`${API_URL}/comments/${cid}`, {
            method: 'DELETE',
            headers: HEADERS
        });
    }

    async post(id) {
        const post = await this.request(`/posts/${id}`);

        if (post) {
            return post;
        }

        return {};
    }

    async deletePost(post_id) {
        const response = await fetch(`${API_URL}/posts/${post_id}`, {
            method: 'DELETE',
            headers: HEADERS
        });
    }

    async comentariosPost(post_id) {
        const comentarios = await this.request(`/posts/${post_id}/comments`);
        if (comentarios) {
            return comentarios;
        }

        return [];
    }

    async novoComentario(comentario, post) {
        let metodo = 'POST';
        let uri = '/comments/';

        if (!comentario.id) {
            comentario['id'] = uid(20);
            comentario['parentId'] = post;
            comentario['new'] = true;
        } else {
            metodo = 'PUT';
            uri = `/comments/${comentario.id}`;
        }

        comentario['timestamp'] = Date.now();

        await fetch(`${API_URL}${uri}`, {
            method: metodo,
            headers: {
                'Content-type': 'application/json',
                ...HEADERS
            },
            body: JSON.stringify(comentario)
        });

    }

    async vote(id, type, upDown) {

        let uri = "";

        switch (type) {
            case TYPE_COMMENT: {
                uri = 'comments';
                break;
            }
            case TYPE_POST: {
                uri = 'posts';
                break;
            }
        }

        await fetch(`${API_URL}/${uri}/${id}`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                ...HEADERS
            },
            body: JSON.stringify({ option: upDown })
        });
    }

    async request(uri, params = []) {
        const response = await fetch(`${API_URL}${uri}`, { headers: HEADERS });
        const responseJson = await response.json();

        return responseJson;
    }

}