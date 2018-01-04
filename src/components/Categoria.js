import React, { Component } from 'react';
import { connect } from 'react-redux';

import Posts from './ui/Posts';
import { postLoad } from '../actions/post';
import mapStateToProps from '../mappers/postMapper';

import Client from '../client/ReadAPI';

class Categoria extends Component {

    async componentDidMount() {
        if (this.props.posts.length === 0) {
            const posts = await new Client().posts();
            this.props.dispatch(postLoad(posts));
        }
    }

    render() {
        return (
            <div>
                <Posts category={this.props.match.params.name} nome={`Category: ${this.props.match.params.name}`} />
            </div>
        );
    }

}

export default connect(mapStateToProps)(Categoria);