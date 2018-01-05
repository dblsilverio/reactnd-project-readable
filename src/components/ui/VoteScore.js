import React, { Component } from 'react';

export default class VoteScore extends Component {

    render() {

        const { score } = this.props;
        let classState = "badge badge-secondary";

        if (score > 0) {
            classState = "badge badge-success";
        } else if (score < 0) {
            classState = "badge badge-danger";
        }

        return (
            <span className={classState}>{score}</span>
        );
    }

}