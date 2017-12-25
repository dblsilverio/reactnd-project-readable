import React, { Component } from 'react';

export default class Index extends Component {

    render() {
        return (
            <div>

                <form className="form-horizontal">
                    <fieldset>

                        <legend>Form Name</legend>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="titulo">Título</label>
                            <div className="col-md-5">
                                <input id="titulo" name="titulo" type="text" placeholder="Meu post" className="form-control input-md" />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="corpo">Corpo</label>
                            <div className="col-md-4">
                                <textarea className="form-control" id="corpo" name="corpo"></textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="data">Data de Criação</label>
                            <div className="col-md-4">
                                <input id="data" name="data" type="text" placeholder="10/12/2017" className="form-control input-md" />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="autor">Autor</label>
                            <div className="col-md-4">
                                <input id="autor" name="autor" type="text" placeholder="João da Silva" className="form-control input-md" />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="votos">Votos</label>
                            <div className="col-md-2">
                                <input id="votos" name="votos" type="text" placeholder="371" className="form-control input-md" />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="criar"></label>
                            <div className="col-md-4">
                                <button id="criar" name="criar" className="btn btn-primary">Criar</button>
                            </div>
                        </div>

                    </fieldset>
                </form>


            </div >
        );
    }

}