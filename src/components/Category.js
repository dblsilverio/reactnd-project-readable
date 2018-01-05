import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from './ui/Posts';
import { postLoad } from '../actions/post';
import mapStateToProps from '../mappers/postMapper';

import Client from '../client/ReadAPI';

class Category extends Component {

    async componentDidMount() {

        const { dispatch, posts } = this.props;

        if (posts.length === 0) {
            const posts = await new Client().posts();
            dispatch(postLoad(posts));
        }
    }

    render() {

        const { match } = this.props;

        return (
            <div>
                <Posts category={match.params.name} nome={`Category: ${match.params.name}`} />
            </div>
        );
    }

}

export default connect(mapStateToProps)(Category);