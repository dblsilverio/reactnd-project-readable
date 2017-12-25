import React, { Component } from 'react';

export default class Pontuacao extends Component {

    state = {
        estado: 'badge badge-secondary'
    }

    componentWillReceiveProps(props) {

        let classeEstado = 'badge badge-secondary';

        if (props.pontos > 0) {
            classeEstado = 'badge badge-success'
        } else if (props.pontos < 0) {
            classeEstado = 'badge badge-danger'
        }

        this.setState({
            estado: classeEstado
        });
    }

    render() {
        return (
            <span className={this.state.estado}>{this.props.pontos}</span>
        );
    }

}