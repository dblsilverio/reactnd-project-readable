import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoDiffModified from 'react-icons/lib/go/diff-modified';
import GoDiffRemoved from 'react-icons/lib/go/diff-removed';
import GoDownVote from 'react-icons/lib/go/chevron-down';
import GoUpVote from 'react-icons/lib/go/chevron-up';

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

    async deletePost(pid) {
        const client = new Client();

        await client.deletePost(pid);
    }

    async vote(upDown){
        const client = new Client();

        await client.vote(this.state.post.id, upDown);
    }

    render() {
        return (
            <div>
                <h1><Pontuacao pontos={this.state.post.voteScore} /> {this.state.post.title}&nbsp;
                    <button className="btn btn-success btn-sm" onClick={() => this.vote('upVote')}><GoUpVote size="20" /></button>
                    <button className="btn btn-danger btn-sm" onClick={() => this.vote('downVote')}><GoDownVote size="20" /></button>
                </h1>
                <div>
                    <Link className="btn btn-warning btn-sm" to={`/posts/${this.state.post.id}/edit`} size="20" ><GoDiffModified size="20" /></Link>
                    <button className="btn btn-danger btn-sm" onClick={() => this.deletePost(this.state.post.id)}><GoDiffRemoved size="20" /></button>
                </div>
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