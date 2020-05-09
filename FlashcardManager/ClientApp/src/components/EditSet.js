import React, { Component } from 'react';

export class EditSet extends Component {
    constructor(props) {
        super(props);
        this.setId = this.props.match.params.id;
        console.log(this.setId);
    }

    render() {
        return (
            <>
                <h4> Editing set number {this.setId} </h4>
            </>
        )
    }
}