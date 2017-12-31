import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoDiffModified from 'react-icons/lib/go/diff-modified';
import GoDiffRemoved from 'react-icons/lib/go/diff-removed';
import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import Comentarios from './ui/Comentarios';
import Pontuacao from './ui/Pontuacao';

import Client from '../client/ReadAPI';

export default class Post extends Component {

    state = {
        post: {},
        comment: {}
    }

    async componentDidMount() {
        const client = new Client();

        this.setState({
            post: await client.post(this.props.match.params.id)
        })
    }

    async deletePost(pid) {
        const client = new Client();

        await client.deletePost(pid);
    }

    async vote(upDown) {
        const client = new Client();

        await client.vote(this.state.post.id, upDown);
    }

    render() {
        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1><Pontuacao pontos={this.state.post.voteScore} /> {this.state.post.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="lead">{new Date(this.state.post.timestamp).toLocaleDateString()} by {this.state.post.author} @ <Link to={`/categoria/${this.state.post.category}`}>{this.state.post.category}</Link></p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <pre>
                                {this.state.post.body}
                            </pre>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <p className="lead" style={{ 'text-align': 'center' }}>
                            <button className="btn btn-success btn-sm" onClick={() => this.vote('upVote')}><FAThumbsUp size="20" /></button>&nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => this.vote('downVote')}><FAThumbsDown size="20" /></button>
                        </p>
                    </div>
                </div>
                <div>
                    <Comentarios post={this.state.post.id} />
                </div>
            </div>
        );
    }

}