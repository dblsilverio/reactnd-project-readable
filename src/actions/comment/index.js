export const COMMENT_LOAD = "COMMENT_LOAD";
export const COMMENT_DELETE = "COMMENT_DELETE";
export const COMMENT_ADD = "COMMENT_ADD";
export const COMMENT_UPDATE = "COMMENT_UPDATE";
export const COMMENT_VOTE = "COMMENT_VOTE";

export function commentLoad(comments){
    return {
        type: COMMENT_LOAD,
        comments
    }
}

export function commentDelete(comments, commentId){
    return {
        type: COMMENT_DELETE,
        comments,
        commentId
    }
}

export function commentAdd(comments, comment){
    return {
        type: COMMENT_ADD,
        comments,
        comment
    }
}

export function commentUpdate(comments, comment){
    return {
        type: COMMENT_UPDATE,
        comments,
        comment
    }
}

export function commentVote(comments, commentId, voteScore){
    return {
        type: COMMENT_VOTE,
        comments,
        commentId,
        voteScore
    }
}