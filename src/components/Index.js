import React, { Component } from 'react';

import Posts from './ui/Posts';

import Client from '../client/ReadAPI';

export default class Index extends Component {

    //Posts para redux
    state = {
        posts: []
    }

    async componentDidMount() {
        this.setState({
            posts: await new Client().posts()
        })
    }

    render() {
        return (
            <div>
                <Posts posts={this.state.posts} />
            </div>
        );
    }

}