import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Pontuacao from './Pontuacao';

export default class Posts extends Component {

    render() {
        return (
            <div>
                <h1>{this.props.nome}</h1>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '50%' }}>Título</th>
                            <th>Autor</th>
                            <th>Data Publicação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.posts.map(post => (
                                <tr key={post.id}>
                                    <td><Pontuacao pontos={post.voteScore} /> <Link to={`/posts/${post.id}`}>{post.title}</Link></td>
                                    <td>{post.author}</td>
                                    <td>{new Date(post.timestamp).toLocaleDateString()}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }

}