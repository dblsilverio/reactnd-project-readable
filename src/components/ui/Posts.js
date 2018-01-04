import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import mapStateToProps from '../../mappers/postMapper';

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

        console.log(posts)
        

        if (this.state.ordering === 'voteScore') {
            posts = posts.sort((p, r) => {
                return r.voteScore - p.voteScore * (this.state.descending ? 1 : -1);
            })
        } else if (this.state.ordering === 'title') {
            posts = posts.sort((p, r) => {
                let ret = 0;

                if (r.title < p.title) {
                    ret = 1;
                } else if (r.title > p.title) {
                    ret = -1;
                }

                return ret * (this.state.descending ? 1 : -1);
            })
        } else if (this.state.ordering === 'date') {
            posts = posts.sort((p, r) => {
                return r.timestamp - p.timestamp * (this.state.descending ? 1 : -1);
            })
        } else if (this.state.ordering === 'author') {
            posts = posts.sort((p, r) => {
                let ret = 0;

                if (r.author < p.author) {
                    ret = 1;
                } else if (r.author > p.author) {
                    ret = -1;
                }

                return ret * (this.state.descending ? 1 : -1);
            })
        }

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