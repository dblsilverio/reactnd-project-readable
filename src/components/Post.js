import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import FAEraser from 'react-icons/lib/fa/eraser';
import FAEdit from 'react-icons/lib/fa/edit';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import mapStateToProps from '../mappers/postMapper';

import Comentarios from './ui/Comentarios';
import Pontuacao from './ui/Pontuacao';
import Voto from './ui/Voto';

import Client from '../client/ReadAPI';
import { postDelete } from '../actions/post/index';

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

        try {
            await client.deletePost(pid);
            this.props.dispatch(postDelete(this.props.posts, pid));
            this.props.history.push('/');
        } catch (e) {
            console.error(e);
        }
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
                                {new Date(this.state.post.timestamp).toLocaleDateString()} by {this.state.post.author} @ <Link to={`/${this.state.post.category}`}>{this.state.post.category}</Link>
                                &nbsp;
                                <span>
                                    <Link className="btn btn-warning btn-sm" to={`/${this.state.post.category}/${this.state.post.id}/edit`}><FAEdit size="15" /></Link>
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
                                <Voto postVote={this.state.post} size="20" />
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