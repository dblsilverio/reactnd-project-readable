export const POST_LOAD = "POST_LOAD";
export const POST_VOTE = "POST_VOTE";
export const POST_DELETE = "POST_DELETE";
export const POST_ADD = "POST_ADD";
export const POST_UPDATE = "POST_UPDATE";

export function postLoad(posts){
    return {
        type: POST_LOAD,
        posts
    }
}

export function postVote(posts, postId, voteScore){
    return {
        type: POST_VOTE,
        posts,
        postId,
        voteScore
    }
}

export function postDelete(posts, postId){
    return {
        type: POST_DELETE,
        posts,
        postId
    }
}

export function postAdd(posts, post){
    return {
        type: POST_ADD,
        posts,
        post
    }
}

export function postUpdate(posts, post){
    return {
        type: POST_UPDATE,
        posts,
        post
    }
}