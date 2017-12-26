import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GoDiffModified from 'react-icons/lib/go/diff-modified';
import GoDiffRemoved from 'react-icons/lib/go/diff-removed';

import Pontuacao from './Pontuacao';

import Client from '../../client/ReadAPI';

export default class Comentarios extends Component {

    state = {
        comments: [],
        comment: {
            author: '',
            body: ''
        }
    }

    async componentWillReceiveProps(props) {
        const client = new Client();

        this.setState({
            comments: await client.comentariosPost(props.post)
        })
    }

    handleForm(event) {
        if (event.target.name in this.state.comment) {
            const name = event.target.name;
            const value = event.target.value;
            this.setState(prev => {
                return {
                    comment: {
                        ...this.state.comment,
                        [name]: value
                    }
                }
            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.state.comment.body){
            alert('Preencha um corpo para o comentário');
            return;
        }

        const client = new Client();
        client.novoComentario(this.state.comment, this.props.post);
    }

    cancelar(event) {
        this.setState(prev => {
            return {
                comment: {
                    author: '',
                    body: ''
                }
            }
        })
    }

    async deleteComment(cid) {
        const client = new Client();
        client.deleteComment(cid);
    }

    async editComment(comment) {
        this.setState({
            comment
        })
    }

    render() {
        return (
            <div>

                <div>
                    <h5>Comente este post</h5>
                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="author">Autor</label>
                            <div className="col-md-5">
                                <input className="form-control" id="author" name="author" type="text" placeholder="João" onChange={this.handleForm.bind(this)} value={this.state.comment.author} />

                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-md-4 control-label" htmlFor="body">body</label>
                            <div className="col-md-4">
                                <textarea className="form-control" id="body" name="body" onChange={this.handleForm.bind(this)} value={this.state.comment.body}></textarea>
                            </div>
                        </div>
                        <button onClick={this.handleSubmit.bind(this)}>Comentar</button> <button type="button" onClick={this.cancelar.bind(this)}>Cancelar</button>
                    </form>
                </div>

                <h4>Comentários</h4>
                {this.state.comments.map(comment => (
                    <div key={comment.id}>
                        <h5><Pontuacao pontos={comment.voteScore} /> {comment.author} em {new Date(comment.timestamp).toLocaleDateString()}</h5>
                        <p>
                            <button className="btn btn-warning btn-sm" onClick={() => this.editComment(comment)}><GoDiffModified size="20" /></button>
                            <button className="btn btn-danger btn-sm" onClick={() => this.deleteComment(comment.id)}><GoDiffRemoved size="20" /></button>
                        </p>
                        <p>{comment.body}</p>
                    </div>
                ))}
            </div>
        );
    }

}