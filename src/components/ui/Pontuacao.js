import React, { Component } from 'react';

export default class Pontuacao extends Component {

    render() {

        const { pontos } = this.props;
        let estado = "badge badge-secondary";

        if (pontos > 0) {
            estado = "badge badge-success";
        } else if (pontos < 0) {
            estado = "badge badge-danger";
        }

        return (
            <span className={estado}>{pontos}</span>
        );
    }

}