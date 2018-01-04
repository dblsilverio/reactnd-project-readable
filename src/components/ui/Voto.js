import React, { Component } from 'react';

import { connect } from 'react-redux';

import { postVote } from '../../actions/post';
import mapStateToProps from '../../mappers/postMapper';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import Client from '../../client/ReadAPI';

class Voto extends Component {

    async vote(upDown) {
        const client = new Client();

        try {
            await client.vote(this.props.post.id, upDown);
            this.props.dispatch(postVote(this.props.posts, this.props.post.id, upDown))
        } catch (e) {
            console.log(e);
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