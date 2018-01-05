import React, { Component } from 'react';

import { connect } from 'react-redux';

import Client from '../client/ReadAPI';
import mapStateToProps from '../mappers';
import { postAdd, postUpdate } from '../actions/post/index';

class New extends Component {

    state = {
        post: {
            id: '',
            timestamp: 0,
            title: '',
            body: '',
            author: '',
            category: ''
        }
    }

    async componentDidMount() {
        const client = new Client();
        const { match } = this.props;

        if (match.params.id) {
            const post = await client.post(match.params.id)
            this.category.disabled = true;
            this.author.disabled = true;

            this.setState(prev => {
                return {
                    post
                }
            })
        }

    }

    handleForm(event) {
        if (event.target.name in this.state.post) {
            const name = event.target.name;
            const value = event.target.value;
            this.setState(prev => {
                return {
                    post: {
                        ...this.state.post,
                        [name]: value
                    }
                }
            });
        }
    }

    async handleSubmit(event) {
        event.preventDefault();

        const { post } = this.state;
        const { dispatch, history, posts } = this.props;

        if (!post.category) {
            alert('Select a category');
            return;
        }

        try {
            await new Client().newPost(post);
            if (post.new) {
                dispatch(postAdd(posts, post));
            } else {
                dispatch(postUpdate(posts, post));
            }
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
                            <h1 className="text-center">New Post</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <form method="post" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group"> <label>Title</label>
                                    <input type="text" name="title" className="form-control w-75" placeholder="My first post <3" onChange={this.handleForm.bind(this)} value={post.title} />
                                </div>
                                <div className="form-group"> <label>Content</label>
                                    <textarea name="body" className="form-control" placeholder="I like writing stuffs =D" onChange={this.handleForm.bind(this)} value={post.body} />
                                </div>
                                <div className="form-group"> <label>Category</label>
                                    <select id="category" name="category" className="form-control w-25" onChange={this.handleForm.bind(this)} ref={(input) => { this.category = input; }} value={post.category}>
                                        <option value=""></option>
                                        {this.props.categories.map(category => (
                                            <option key={category.path} value={category.path}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group"> <label>Author</label>
                                    <input type="text" name="author" className="form-control w-25" placeholder="John Doe" onChange={this.handleForm.bind(this)} ref={(input) => this.author = input} value={post.author} />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <button type="submit" className="btn btn-primary">Publish</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps)(New);