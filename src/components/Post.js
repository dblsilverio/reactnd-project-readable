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
                    <Comentarios post={this.state.post.id} />
                </div>
            </div>
        );
    }

}