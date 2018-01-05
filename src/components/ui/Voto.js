import React, { Component } from 'react';

import { connect } from 'react-redux';

import * as PostActions from '../../actions/post';
import * as CommentActions from '../../actions/comment';
import mapStateToProps from '../../mappers';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import Client, { TYPE_COMMENT, TYPE_POST } from '../../client/ReadAPI';

class Voto extends Component {

    async vote(upDown) {
        const client = new Client();
        const { commentVote, dispatch, postVote } = this.props;

        let type = null;
        let id = null;

        try {

            if (postVote) {
                type = TYPE_POST;
                id = postVote.id;
            } else if (commentVote) {
                type = TYPE_COMMENT;
                id = commentVote.id;
            }

            await client.vote(id, type, upDown);
            dispatch(this.prepareVote(type, upDown));

        } catch (e) {
            console.log(e);
        }
    }

    prepareVote(type, upDown) {
        const { posts, postVote, comments, commentVote } = this.props;
        switch (type) {
            case TYPE_POST: {
                return PostActions.postVote(posts, postVote.id, upDown);
            }
            case TYPE_COMMENT: {
                return CommentActions.commentVote(comments, commentVote.id, upDown);
            }
        }

    }

    render() {
        const { size } = this.props;
        const padding = size * 0.5;

        return (
            <span>
                <button className="btn btn-success" style={{ padding }} onClick={() => this.vote('upVote')}><FAThumbsUp size={size} /></button>
                &nbsp;
                <button className="btn btn-danger" style={{ padding }} onClick={() => this.vote('downVote')}><FAThumbsDown size={size} /></button>
            </span>
        )
    }

}

export default connect(mapStateToProps)(Voto);