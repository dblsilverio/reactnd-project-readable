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
        return (
            <p className="lead" style={{ textAlign: 'center' }}>
                <button className="btn btn-success btn-sm" onClick={() => this.vote('upVote')}><FAThumbsUp size="20" /></button>
                &nbsp;
                <button className="btn btn-danger btn-sm" onClick={() => this.vote('downVote')}><FAThumbsDown size="20" /></button>
            </p>
        )
    }

}

export default connect(mapStateToProps)(Voto);