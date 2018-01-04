import { POST_LOAD, POST_VOTE, POST_DELETE, POST_ADD } from '../../actions/post';

export default function post(state = { posts: [] }, action) {
    const { posts } = action;

    switch (action.type) {
        case POST_LOAD: {
            return {
                posts
            }
        }
        case POST_VOTE: {
            const { postId, voteScore } = action;
            const post = posts.find(post => post.id === postId);
            post.voteScore += (voteScore === 'upVote' ? 1 : -1);

            return {
                posts: posts.map(p => {
                    if (p.id === post.id) {
                        return post;
                    } else {
                        return p;
                    }
                })
            }
        }
        case POST_DELETE: {
            const { postId } = action;

            return {
                posts: posts.filter(post => post.id !== postId)
            }
        }
        case POST_ADD: {
            const { post } = action;
            const updatedPosts = posts;
            updatedPosts.push(post);

            return {
                posts: updatedPosts
            }
        }
        default: {
            return state;
        }
    }
}