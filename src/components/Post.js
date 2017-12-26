import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoDiffModified from 'react-icons/lib/go/diff-modified';
import GoDiffRemoved from 'react-icons/lib/go/diff-removed';

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

    async deletePost(pid){
        const client = new Client();

        await client.deletePost(pid);
    }

    handleForm(event) {
        if (event.target.name in this.state.post) {
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
        let comment = this.state.comment;

        const client = new Client();
        client.novoComentario(this.state.comment, this.state.post);
    }

    render() {
        return (
            <div>
                <h1>{this.state.post.title} <Pontuacao pontos={this.state.post.voteScore} /> <button className="btn btn-warning btn-sm" onClick={() => this.editPost(this.state.post.id)}><GoDiffModified size="20" /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => this.deletePost(this.state.post.id)}><GoDiffRemoved size="20" /></button></h1>
                <div>{this.state.post.author} @ {new Date(this.state.post.timestamp).toLocaleDateString()} em <Link to={`/categoria/${this.state.post.category}`}>{this.state.post.category}</Link></div>

                <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="body"></label>
                    <div className="col-md-4">
                        {this.state.post.body}
                    </div>
                </div>
                <div>
                    <h5>Comente este post</h5>
                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="author">Autor</label>
                            <div className="col-md-5">
                                <input className="form-control" id="author" name="author" type="text" placeholder="João" onChange={this.handleForm.bind(this)} />

                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="body">body</label>
                            <div className="col-md-4">
                                <textarea className="form-control" id="body" name="body" onChange={this.handleForm.bind(this)}></textarea>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit.bind(this)}>Comentar</button>
                    </form>
                </div>
                <div>
                    <Comentarios post={this.state.post.id} />
                </div>
            </div>
        );
    }

}