import React, { Component } from 'react';

import Posts from './ui/Posts';

import Client from '../client/ReadAPI';

export default class Categoria extends Component {

    //Posts para redux
    state = {
        posts: []
    }

    async componentDidMount() {
        await this.refreshPosts(this.props.match.params.name);
    }

    async componentWillReceiveProps(props){
        await this.refreshPosts(props.match.params.name);
    }

    async refreshPosts(categoria){
        this.setState({
            posts: await new Client().posts(categoria)
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