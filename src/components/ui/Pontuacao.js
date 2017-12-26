import React, { Component } from 'react';

export default class Pontuacao extends Component {

    render() {

        let estado = "badge badge-secondary";

        if(this.props.pontos > 0){
            estado = "badge badge-success";
        } else if(this.props.pontos < 0){
            estado = "badge badge-danger";
        }

        return (
            <span className={estado}>{this.props.pontos}</span>
        );
    }

}