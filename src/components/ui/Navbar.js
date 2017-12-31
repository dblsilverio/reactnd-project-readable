import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import FABook from 'react-icons/lib/fa/book';
import FANewspaper from 'react-icons/lib/fa/newspaper-o';


import Client from '../../client/ReadAPI';

export default class Navbar extends Component {

    state = {
        categories: []
    }

    async componentDidMount() {
        this.setState({
            categories: await new Client().categories()
        })
    }

    render() {
        return (

            <nav className="navbar navbar-expand-md bg-primary navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/"><FABook /><b>&nbsp;Leitura</b></Link>
                    <Link className="btn btn-default navbar-btn btn-primary text-white" to="/">Home</Link>
                    <div className="btn-group">
                        <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown"> Categories </button>
                        <div className="dropdown-menu">
                            {this.state.categories.map(category => (
                                <Link className="dropdown-item" key={category.path} to={`/categoria/${category.name}`}>{category.name}</Link>
                            ))}
                        </div>
                    </div>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbar2SupportedContent" aria-controls="navbar2SupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                    <div className="collapse navbar-collapse text-center justify-content-end" id="navbar2SupportedContent">
                        <ul className="navbar-nav"></ul>
                        <a className="btn navbar-btn ml-2 text-white btn-primary"><FANewspaper />&nbsp;New Post</a>
                    </div>
                </div>
            </nav>

        );
    }

}