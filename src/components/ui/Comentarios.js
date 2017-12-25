import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

    async deleteComment(cid){
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
                        <p><button onClick={() => this.deleteComment(comment.id)}>Apagar</button></p>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
        );
    }

}