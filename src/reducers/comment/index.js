import { COMMENT_LOAD, COMMENT_DELETE, COMMENT_ADD, COMMENT_UPDATE, COMMENT_VOTE } from '../../actions/comment/index';

export default function comment(state = { comments: [] }, action) {
    const { comments } = action;

    console.log(action);

    switch (action.type) {
        case COMMENT_LOAD: {
            return {
                comments
            }
        }
        case COMMENT_DELETE: {
            const { commentId } = action;
            return {
                comments: comments.filter(comment => comment.id !== commentId)
            }
        }
        case COMMENT_ADD: {
            const { comment } = action;
            const updatedComments = comments;
            updatedComments.push(comment);

            return {
                comments: updatedComments
            }
        }
        case COMMENT_UPDATE: {
            const { comment } = action;
            return {
                comments: comments.map(c => {
                    if (c.id === comment.id) {
                        return comment;
                    }

                    return c;
                })
            }
        }
        case COMMENT_VOTE: {
            const { commentId, voteScore } = action;
            const comment = comments.find(comment => comment.id === commentId);
            comment.voteScore += (voteScore === 'upVote' ? 1 : -1);

            return {
                comments: comments.map(c => {
                    if(c.id === comment.id){
                        return comment;
                    } else {
                        return c;
                    }
                })
            }
        }
        default: {
            return state;
        }
    }

}