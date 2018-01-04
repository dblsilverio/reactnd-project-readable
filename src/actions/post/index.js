export const POST_LOAD = "POST_LOAD";
export const POST_VOTE = "POST_VOTE";
export const POST_DELETE = "POST_DELETE";
export const POST_ADD = "POST_ADD";
export const POST_BY_CATEGORY = "POST_BY_CATEGORY"
export const POST_SORT = "POST_SORT";

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

export function postAdd(post){
    return {
        type: POST_ADD,
        post
    }
}

export function postByCategory(category){
    return {
        type: POST_BY_CATEGORY,
        category
    }
}

export function postSort(sortBy, descending){
    return {
        type: POST_SORT,
        sortBy,
        descending
    }
}