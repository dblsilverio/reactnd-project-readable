import React, { Component } from 'react';

import Posts from './ui/Posts';

import Client from '../client/ReadAPI';

export default class Index extends Component {

    //Posts para redux
    state = {
        posts: []
    }

    async componentDidMount() {
        let posts = await new Client().posts();

        this.setState({
            posts
        })
    }

    render() {
        return (
            <div>
                <Posts posts={this.state.posts} nome="Top Posts" />
            </div>
        );
    }

}