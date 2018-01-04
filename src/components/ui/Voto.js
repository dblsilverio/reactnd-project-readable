import React, { Component } from 'react';

import { connect } from 'react-redux';

import { postVote } from '../../actions/post';
import { commentVote } from '../../actions/comment';
import mapStateToProps from '../../mappers';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import Client, { TYPE_COMMENT, TYPE_POST } from '../../client/ReadAPI';

class Voto extends Component {

    async vote(upDown) {
        const client = new Client();
        let type = null;
        let id = null;

        try {

            if (this.props.postVote) {
                type = TYPE_POST;
                id = this.props.postVote.id;
            } else if (this.props.commentVote) {
                type = TYPE_COMMENT;
                id = this.props.commentVote.id;
            }

            await client.vote(id, type, upDown);
            this.props.dispatch(this.prepareVote(type, upDown));

        } catch (e) {
            console.log(e);
        }
    }

    prepareVote(type, upDown) {
        switch (type) {
            case TYPE_POST: {
                return postVote(this.props.posts, this.props.postVote.id, upDown);
            }
            case TYPE_COMMENT: {
                return commentVote(this.props.comments, this.props.commentVote.id, upDown);
            }
        }

    }

    render() {

        const padding = this.props.size * 0.5;

        return (
            <span>
                <button className="btn btn-success" style={{ padding }} onClick={() => this.vote('upVote')}><FAThumbsUp size={this.props.size} /></button>
                &nbsp;
                <button className="btn btn-danger" style={{ padding }} onClick={() => this.vote('downVote')}><FAThumbsDown size={this.props.size} /></button>
            </span>
        )
    }

}

export default connect(mapStateToProps)(Voto);