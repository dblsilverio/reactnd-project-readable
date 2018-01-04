import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from './ui/Posts';

import { postLoad } from '../actions/post';
import mapStateToProps from '../mappers/postMapper';

import Client from '../client/ReadAPI';

class Index extends Component {

    //Posts para redux
    state = {
        posts: []
    }

    async componentDidMount() {

        if (this.props.posts.length === 0) {
            const posts = await new Client().posts();
            this.props.dispatch(postLoad(posts));
        }

    }

    render() {
        return (
            <div>
                <Posts nome="Top Posts" />
            </div>
        );
    }

}

export default connect(mapStateToProps)(Index);