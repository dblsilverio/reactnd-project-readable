import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Pontuacao from './ui/Pontuacao';

import Client from '../client/ReadAPI';

export default class Post extends Component {

    state = {
        post: {}
    }

    async componentDidMount() {
        this.setState({
            post: await new Client().post(this.props.match.params.id)
        })
    }

    render() {
        return (
            <div>
                <h1>{this.state.post.title} <Pontuacao pontos={this.state.post.voteScore} /></h1>
                <div>{this.state.post.author} @ {new Date(this.state.post.timestamp).toLocaleDateString()} em <Link to={`/categoria/${this.state.post.category}`}>{this.state.post.category}</Link></div>

                <div className="form-group">
                    <label className="col-md-4 control-label" htmlFor="body"></label>
                    <div className="col-md-4">
                        {this.state.post.body}
                    </div>
                </div>

            </div >
        );
    }

}