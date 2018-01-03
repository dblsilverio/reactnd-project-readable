import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from './ui/Posts';

import Client from '../client/ReadAPI';

class Index extends Component {

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

export default connect()(Index);