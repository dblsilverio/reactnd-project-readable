import React, { Component } from 'react';

import FAEraser from 'react-icons/lib/fa/eraser';
import FAEdit from 'react-icons/lib/fa/edit';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import Pontuacao from './Pontuacao';

import Client from '../../client/ReadAPI';

export default class Comentarios extends Component {

    state = {
        comments: [],
        comment: {
            author: '',
            body: ''
        },
        commentAreaVisible: false
    }

    async componentWillReceiveProps(props) {
        const client = new Client();

        this.setState({
            comments: await client.comentariosPost(props.post)
        })
    }

    handleForm(event) {
        if (event.target.name in this.state.comment) {
            const name = event.target.name;
            const value = event.target.value;
            this.setState(prev => {
                return {
                    comment: {
                        ...this.state.comment,
                        [name]: value
                    }
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.comment.body) {
            alert('Preencha um corpo para o comentário');
            return;
        }

        const client = new Client();
        client.novoComentario(this.state.comment, this.props.post);
    }

    cancelar(event) {
        this.setState(prev => {
            return {
                comment: {
                    author: '',
                    body: ''
                }
            }
        });
        this.toggleComment(null);
    }

    async deleteComment(cid) {
        const client = new Client();
        client.deleteComment(cid);
    }

    async editComment(comment) {
        this.setState({
            comment
        });
        this.toggleComment(null);
    }

    async toggleComment(event) {

        if (this.state.commentAreaVisible) {
            await this.setState((prev) => {
                return {
                    commentAreaVisible: false
                }
            });
        } else {
            await this.setState((prev) => {
                return {
                    commentAreaVisible: true
                }
            });
        }

    }

    async vote(comm_id, upDown){
        const client = new Client();
        await client.voteComment(comm_id, upDown);
    }

    render() {
        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h4 style={{ cursor: 'pointer' }} onClick={this.toggleComment.bind(this)}>Comment this post</h4>
                    </div>
                </div>
                {
                    this.state.commentAreaVisible ? (
                        <div className='row' ref={(div) => { this.commentArea = div; }}>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <form className="" method="post" onSubmit={this.handleSubmit.bind(this)}>
                                            <div className="form-group"> <label>Author</label>
                                                <input type="text" name="author" className="form-control w-25" placeholder="John Doe" onChange={this.handleForm.bind(this)} value={this.state.comment.author} />
                                            </div>
                                            <div className="form-group"> <label>Comment</label>
                                                <input type="text" name="body" className="form-control w-75" placeholder="Comment body" onChange={this.handleForm.bind(this)} value={this.state.comment.body} />
                                            </div>
                                            <div style={{ textAlign: 'center' }}>
                                                <button type="submit" className="btn btn-primary">Comment</button>
                                                &nbsp;
                                    <button type="button" className="btn btn-warning" onClick={this.cancelar.bind(this)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>            update = true;

                            </div>
                        </div>
                    ) : <div></div>
                }
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="">Comments</h4>
                            </div>
                        </div>
                        {this.state.comments.map(comment =>
                            (
                                <div key={comment.id}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <p className="lead">
                                                        <Pontuacao pontos={comment.voteScore} />
                                                        <b>{comment.author}</b> @ {new Date(comment.timestamp).toLocaleDateString()}
                                                        <span>
                                                            <button className="btn btn-success btn-sm" onClick={() => this.vote(comment.id, 'upVote')}><FAThumbsUp size="15" /></button>&nbsp;
                                                            <button className="btn btn-danger btn-sm" onClick={() => this.vote(comment.id, 'downVote')}><FAThumbsDown size="15" /></button>
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12 px-5">
                                            <p className="lead">{comment.body}</p>
                                            <p className="small">
                                                <button className="btn btn-warning btn-sm" onClick={() => this.editComment(comment)}><FAEdit size="15" /></button>
                                                &nbsp;
                                                <button className="btn btn-danger btn-sm" onClick={() => this.deleteComment(comment.id)}><FAEraser size="15" /></button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        );
    }

}