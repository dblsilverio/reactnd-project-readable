import React, { Component } from 'react';

import Posts from './ui/Posts';

import Client from '../client/ReadAPI';

export default class Categoria extends Component {

    //Posts para redux
    state = {
        posts: []
    }

    async componentDidMount() {
        this.setState({
            posts: await new Client().posts(this.props.match.params.name)
        })
    }

    render() {
        return (
            <div>
                <Posts posts={this.state.posts} nome={`Categoria`} />
            </div>
        );
    }

}