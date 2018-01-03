export const POST_LOAD = "POST_LOAD";
export const POST_DELETE = "POST_DELETE";
export const POST_ADD = "POST_ADD";
export const POST_BY_CATEGORY = "POST_BY_CATEGORY"
export const POST_SORT = "POST_SORT";

export function postLoad(posts){
    return {
        type: POST_DELETE,
        posts
    }
}

export function postDelete(id){
    return {
        type: POST_DELETE,
        id
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