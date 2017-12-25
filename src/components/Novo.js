import React, { Component } from 'react';

import Client from '../client/ReadAPI';

export default class Novo extends Component {

    state = {
        categorias: [],
        post: {
            id: '',
            timestamp: 0,
            title: '',
            body: '',
            author: '',
            category: ''
        }
    }

    async componentDidMount(){
        const categorias = await new Client().categories();

        this.setState(prev => {
            return {
                categorias
            }
        })
    }

    handleForm(event) {
        if (event.target.name in this.state.post) {
            const name = event.target.name;
            const value = event.target.value;
            this.setState(prev => {
                return {
                    post: {
                        ...this.state.post,
                        [name]: value
                    }
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.state.post.category){
            alert('Selecione uma categoria');
            return;
        }

        new Client().novoPost(this.state.post);
    }

    render() {
        return (
            <div>

                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <fieldset>

                        <legend>Novo Post</legend>
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="title">Título</label>
                            <div className="col-md-5">
                                <input id="title" name="title" type="text" placeholder="Meu post" className="form-control input-md" onChange={this.handleForm.bind(this)} />

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="body">body</label>
                            <div className="col-md-4">
                                <textarea className="form-control" id="body" name="body" onChange={this.handleForm.bind(this)}></textarea>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="category">category</label>
                            <div className="col-md-4">
                                <select id="category" name="category" className="form-control input-md" onChange={this.handleForm.bind(this)}>
                                <option value=""></option>
                                    {this.state.categorias.map(categoria => (
                                        <option key={categoria.path} value={categoria.path}>{categoria.name}</option>
                                    ))}
                                </select>

                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="author">author</label>
                            <div className="col-md-4">
                                <input id="author" name="author" type="text" placeholder="João da Silva" className="form-control input-md" onChange={this.handleForm.bind(this)} />

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