import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoDiffModified from 'react-icons/lib/go/diff-modified';
import GoDiffRemoved from 'react-icons/lib/go/diff-removed';

import Client from '../../client/ReadAPI';

export default class Comentarios extends Component {

    state = {
        comments: []
    }

    async componentWillReceiveProps(props) {
        const client = new Client();

        this.setState({
            comments: await client.comentariosPost(props.post)
        })
    }

    async deleteComment(cid) {
        const client = new Client();
        client.deleteComment(cid);
    }

    render() {
        return (
            <div>
                <h4>Comentários</h4>
                {this.state.comments.map(comment => (
                    <div key={comment.id}>
                        <h5>{comment.author} em {new Date(comment.timestamp).toLocaleDateString()}</h5>
                        <p>
                            <button className="btn btn-warning btn-sm" onClick={() => this.editComment(comment.id)}><GoDiffModified size="20" /></button>
                            <button className="btn btn-danger btn-sm" onClick={() => this.deleteComment(comment.id)}><GoDiffRemoved size="20" /></button>
                        </p>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
        );
    }

}