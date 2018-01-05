import React, { Component } from 'react';

import { connect } from 'react-redux';

import FAEraser from 'react-icons/lib/fa/eraser';
import FAEdit from 'react-icons/lib/fa/edit';

import { commentLoad, commentDelete, commentAdd, commentUpdate } from '../../actions/comment';
import commentMapper from '../../mappers/commentMapper';
import VoteScore from './VoteScore';
import VotingBoard from './VotingBoard';

import Client from '../../client/ReadAPI';

class Comments extends Component {

    state = {
        comment: {
            author: '',
            body: ''
        },
        commentAreaVisible: false
    }

    async componentDidMount() {
        const { post } = this.props;

        if (post) {
            this.loadComments(post);
        }
    }

    async componentDidUpdate(prevProps) {

        const { post } = this.props;

        if (post !== prevProps.post) {
            this.loadComments(post);
        }
    }

    async loadComments(post) {
        const client = new Client();
        let comments = await client.postComments(post);
        comments = comments.sort((c, d) => {
            return d.voteScore - c.voteScore;
        });

        this.props.dispatch(commentLoad(comments));
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

        const { post, dispatch, comments } = this.props;

        if (!this.state.comment.body) {
            alert('Preencha um corpo para o comentário');
            return;
        }

        const client = new Client();
        try {
            await client.newComment(this.state.comment, post);

            if (!this.state.comment.new) {
                dispatch(commentUpdate(comments, this.state.comment));
            } else {
                dispatch(commentAdd(comments, this.state.comment));
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

        const { comments, dispatch } = this.props;

        const client = new Client();
        try {
            await client.deleteComment(cid);
            dispatch(commentDelete(comments, cid));
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
        let { commentAreaVisible } = this.state;

        this.setState({
            commentAreaVisible: !commentAreaVisible
        })

    }

    render() {

        const { commentAreaVisible } = this.state;
        const { comments } = this.props;

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <h5 style={{ cursor: 'pointer' }} onClick={this.toggleComment.bind(this)}>Comment this post [+]</h5>
                    </div>
                </div>
                {
                    commentAreaVisible ? (
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
                        {comments.length === 0
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
                                        <h4><b>{comments.length}</b> Comments</h4>
                                    </div>
                                </div>
                                {comments.map(comment =>
                                    (
                                        <div key={comment.id}>
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <p className="lead">
                                                                <VoteScore score={comment.voteScore} />
                                                                <b>{comment.author}</b> @ {new Date(comment.timestamp).toLocaleDateString()}
                                                                <span>
                                                                    &nbsp;<VotingBoard commentVote={comment} size="10" />
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

export default connect(commentMapper)(Comments);