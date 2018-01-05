import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import FAEraser from 'react-icons/lib/fa/eraser';
import FAEdit from 'react-icons/lib/fa/edit';

import mapStateToProps from '../mappers/postMapper';

import Comentarios from './ui/Comentarios';
import Pontuacao from './ui/Pontuacao';
import Voto from './ui/Voto';

import Client from '../client/ReadAPI';
import { postDelete } from '../actions/post/index';

class Post extends Component {

    state = {
        post: {}
    }

    async componentDidMount() {
        this.setState({
            post: this.props.posts.find(post => post.id === this.props.match.params.id)
        })
    }

    async deletePost(pid) {
        const client = new Client();
        const { dispatch, history, posts } = this.props;

        try {
            await client.deletePost(pid);
            dispatch(postDelete(posts, pid));
            history.push('/');
        } catch (e) {
            console.error(e);
        }
    }

    render() {

        const { post } = this.state;

        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1><Pontuacao pontos={post.voteScore} /> {post.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="lead">
                                {new Date(post.timestamp).toLocaleDateString()} by {post.author} @ <Link to={`/${post.category}`}>{post.category}</Link>
                                &nbsp;
                                <span>
                                    <Link className="btn btn-warning btn-sm" to={`/${post.category}/${post.id}/edit`}><FAEdit size="15" /></Link>
                                    &nbsp;
                                    <button className="btn btn-danger btn-sm" onClick={() => this.deletePost(post.id)}><FAEraser size="15" /></button>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <pre style={{ whiteSpace: 'pre-wrap' }}>
                                {post.body}
                            </pre>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="lead" style={{ textAlign: 'center' }}>
                                <Voto postVote={post} size="20" />
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <Comentarios post={post.id} />
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps)(Post);