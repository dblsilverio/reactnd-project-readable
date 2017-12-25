import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

            <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
                <Link className="navbar-brand" to="/">Leitura</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="" id="dropdown03" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">Categorias</Link>
                            <div className="dropdown-menu" aria-labelledby="dropdown03">
                                {this.state.categories.map(category => (
                                    <Link className="dropdown-item" key={category.path} to={`/categoria/${category.name}`}>{category.name}</Link>
                                ))}
                            </div>
                        </li>
                    </ul>
                    <span className="form-inline mt-2 mt-md-0">
                        <Link className="btn btn-outline-primary my-2 my-sm-0" to="/novo">Nova Postagem</Link>
                    </span>
                </div>
            </nav>

        );
    }

}