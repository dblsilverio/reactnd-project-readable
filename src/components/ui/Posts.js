import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from '../../mappers/postMapper';
import postSorter from '../../helpers/postSorter';

import Pontuacao from './Pontuacao';

class Posts extends Component {

    state = {
        ordering: 'voteScore',
        descending: true
    };

    orderByAuthor() {

        this.setState({
            ordering: 'author',
            descending: !this.state.descending
        });
    }

    orderByDate() {
        this.setState({
            ordering: 'date',
            descending: !this.state.descending
        });
    }

    orderByTitle() {
        this.setState({
            ordering: 'title',
            descending: !this.state.descending
        });
    }

    orderByVoteScore() {
        this.setState({
            ordering: 'voteScore',
            descending: !this.state.descending
        });
    }

    render() {
        let posts = this.props.posts;
        let category = this.props.category;

        if(category){
            posts = posts.filter(post => post.category === category);
        }

        posts = postSorter(posts, this.state.ordering, this.state.descending);

        return (
            <div className="py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="">{this.props.nome}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10%', cursor: 'pointer' }} onClick={this.orderByVoteScore.bind(this)}># Votes</th>
                                        <th style={{ width: '50%', cursor: 'pointer' }} onClick={this.orderByTitle.bind(this)}>Title</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.orderByAuthor.bind(this)}>Author</th>
                                        <th style={{ cursor: 'pointer' }} onClick={this.orderByDate.bind(this)}>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        posts.map(post => (
                                            <tr key={post.id}>
                                                <td style={{ textAlign: 'center' }}><Pontuacao pontos={post.voteScore} /></td>
                                                <td><Link to={`/posts/${post.id}`}>{post.title}</Link></td>
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

export default connect(mapStateToProps)(Posts);