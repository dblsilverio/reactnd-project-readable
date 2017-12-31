import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Pontuacao from './Pontuacao';

export default class Posts extends Component {

    render() {
        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="">Top Posts</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }}>Title</th>
                                        <th>Author</th>
                                        <th>Date</th>
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
                    </div>
                </div>
            </div>
        );
    }

}