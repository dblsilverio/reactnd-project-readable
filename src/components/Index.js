import React, { Component } from 'react';

import Client from '../client/ReadAPI';

export default class Index extends Component {

    async componentDidMount() {
        console.log(await new Client().categories());
    }

    render() {
        return (
            <div>




                <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
                    <a className="navbar-brand" href="#">Leitura</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="dropdown03" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">Categorias</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown03">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-primary my-2 my-sm-0">Nova Postagem</button>
                        </form>
                    </div>
                </nav>


                <h1>Top Posts</h1>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Votos</th>
                            <th style={{ width: '50%' }}>Título</th>
                            <th>Autor</th>
                            <th>Data Publicação</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>John</td>
                            <td>Doe</td>
                            <td>john@example.com</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr>
                            <td>Mary</td>
                            <td>Moe</td>
                            <td>mary@example.com</td>
                            <td>john@example.com</td>
                        </tr>
                    </tbody>
                </table>






            </div>
        );
    }

}