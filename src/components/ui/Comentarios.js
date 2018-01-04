import React, { Component } from 'react';

import { connect } from 'react-redux';

import FAEraser from 'react-icons/lib/fa/eraser';
import FAEdit from 'react-icons/lib/fa/edit';

import FAThumbsUp from 'react-icons/lib/fa/thumbs-o-up';
import FAThumbsDown from 'react-icons/lib/fa/thumbs-o-down';

import { commentLoad, commentDelete, commentAdd, commentUpdate } from '../../actions/comment';
import commentMapper from '../../mappers/commentMapper';
import Pontuacao from './Pontuacao';
import Voto from './Voto';

import Client from '../../client/ReadAPI';
import { __esModule } from 'react-redux/lib/components/connectAdvanced';

class Comentarios extends Component {

    state = {
        comment: {
            author: '',
            body: ''
        },
        commentAreaVisible: false
    }

    async componentDidUpdate(prevProps) {
        if (this.props.post !== prevProps.post) {
            const client = new Client();
            let comments = await client.comentariosPost(this.props.post);
            comments = comments.sort((c, d) => {
                return d.voteScore - c.voteScore;
            });

            this.props.dispatch(commentLoad(comments));
        }
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

    async handleSubmit(event) {
        event.preventDefault();

        if (!this.state.comment.body) {
            alert('Preencha um corpo para o comentário');
            return;
        }

        const client = new Client();
        try {
            await client.novoComentario(this.state.comment, this.props.post);//TODO validar

            if (!this.state.comment.new) {
                this.props.dispatch(commentUpdate(this.props.comments, this.state.comment));
            } else {
                this.props.dispatch(commentAdd(this.props.comments, this.state.comment));
            }

            this.cancelar();
        } catch (e) {
            console.log(e);
        }
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
        try {
            await client.deleteComment(cid);
            this.props.dispatch(commentDelete(this.props.comments, cid));
        } catch (e) {
            console.log(e);
        }
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

    render() {

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h5 style={{ cursor: 'pointer' }} onClick={this.toggleComment.bind(this)}>Comment this post [+]</h5>
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
                                </div>
                            </div>
                        </div>
                    ) : <div></div>
                }
                <div className="row">
                    <div className="col-md-12">
                        {this.props.comments.length === 0
                            ?
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>No comments to show</h4>
                                </div>
                            </div>
                            :
                            <div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4><b>{this.props.comments.length}</b> Comments</h4>
                                    </div>
                                </div>
                                {this.props.comments.map(comment =>
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
                                                                    &nbsp;<Voto commentVote={comment} size="10" />
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
                                    ))}
                            </div>

                        }
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(commentMapper)(Comentarios);