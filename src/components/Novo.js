import React, { Component } from 'react';

import Client from '../client/ReadAPI';

export default class Novo extends Component {

    state = {
        categorias: [],
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
        const categorias = await client.categories();

        if (this.props.match.params.id) {
            const post = await client.post(this.props.match.params.id)
            this.category.disabled = true;
            this.author.disabled = true;

            this.setState(prev => {
                return {
                    ...this.state,
                    post
                }
            })
        }

        this.setState(prev => {
            return {
                categorias
            }
        })
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

    handleSubmit(event) {
        event.preventDefault();

        if (!this.state.post.category) {
            alert('Selecione uma categoria');
            return;
        }

        new Client().novoPost(this.state.post);
    }

    render() {
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
                                    <input type="text" name="title" className="form-control w-75" placeholder="My first post <3" onChange={this.handleForm.bind(this)} value={this.state.post.title} />
                                </div>
                                <div className="form-group"> <label>Content</label>
                                    <textarea name="body" className="form-control" placeholder="I like writing stuffs =D" onChange={this.handleForm.bind(this)} value={this.state.post.body} />
                                </div>
                                <div className="form-group"> <label>Category</label>
                                    <select id="category" name="category" className="form-control w-25" onChange={this.handleForm.bind(this)} ref={(input) => { this.category = input; }} value={this.state.post.category}>
                                        <option value=""></option>
                                        {this.state.categorias.map(categoria => (
                                            <option key={categoria.path} value={categoria.path}>{categoria.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group"> <label>Author</label>
                                    <input type="text" name="author" className="form-control w-25" placeholder="John Doe" onChange={this.handleForm.bind(this)} ref={(input) => this.author = input} value={this.state.post.author} />
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