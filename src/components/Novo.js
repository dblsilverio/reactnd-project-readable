import React, { Component } from 'react';

export default class Index extends Component {

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
                                <a className="nav-link dropdown-toggle" href="http://example.com" id="dropdown03" data-toggle="dropdown" aria-haspopup="true"
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


                <form class="form-horizontal">
                    <fieldset>

                        <legend>Form Name</legend>

                        <div class="form-group">
                            <label class="col-md-4 control-label" for="titulo">Título</label>
                            <div class="col-md-5">
                                <input id="titulo" name="titulo" type="text" placeholder="Meu post" class="form-control input-md" />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" for="corpo">Corpo</label>
                            <div class="col-md-4">
                                <textarea class="form-control" id="corpo" name="corpo"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" for="data">Data de Criação</label>
                            <div class="col-md-4">
                                <input id="data" name="data" type="text" placeholder="10/12/2017" class="form-control input-md" />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" for="autor">Autor</label>
                            <div class="col-md-4">
                                <input id="autor" name="autor" type="text" placeholder="João da Silva" class="form-control input-md" />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" for="votos">Votos</label>
                            <div class="col-md-2">
                                <input id="votos" name="votos" type="text" placeholder="371" class="form-control input-md" />

                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label" for="criar"></label>
                            <div class="col-md-4">
                                <button id="criar" name="criar" class="btn btn-primary">Criar</button>
                            </div>
                        </div>

                    </fieldset>
                </form>


            </div>
        );
    }

}