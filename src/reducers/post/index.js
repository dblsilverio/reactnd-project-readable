import { POST_LOAD } from '../../actions/post';

export default function post(state = { posts: [] }, action) {
    const { posts } = action;

    switch(action.type){
        case POST_LOAD:{
            return {
                posts
            }
        }
        default:{
            return state;
        }
    }
}