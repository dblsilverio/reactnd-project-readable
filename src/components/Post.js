import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import FAEraser from 'react-icons/lib/fa/eraser';
import FAEdit from 'react-icons/lib/fa/edit';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import mapStateToProps from '../mappers/postMapper';

import Comentarios from './ui/Comentarios';
import Pontuacao from './ui/Pontuacao';

import Client from '../client/ReadAPI';

class Post extends Component {

    state = {
        post: {},
        comment: {}
    }

    async componentDidMount() {
        this.setState({
            post: this.props.posts.find(post => post.id === this.props.match.params.id)
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
                            <p className="lead">
                                {new Date(this.state.post.timestamp).toLocaleDateString()} by {this.state.post.author} @ <Link to={`/categoria/${this.state.post.category}`}>{this.state.post.category}</Link>
                                &nbsp;
                                <span>
                                    <Link className="btn btn-warning btn-sm" to={`/posts/${this.state.post.id}/edit`}><FAEdit size="15" /></Link>
                                    &nbsp;
                                    <button className="btn btn-danger btn-sm" onClick={() => this.deletePost(this.state.post.id)}><FAEraser size="15" /></button>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {this.state.post.body}
                            </pre>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="lead" style={{ textAlign: 'center' }}>
                                <button className="btn btn-success btn-sm" onClick={() => this.vote('upVote')}><FAThumbsUp size="20" /></button>&nbsp;
                            <button className="btn btn-danger btn-sm" onClick={() => this.vote('downVote')}><FAThumbsDown size="20" /></button>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <Comentarios post={this.state.post.id} />
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps)(Post);