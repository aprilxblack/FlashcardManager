import React, { Component } from 'react';
import './ActionBox.css'

export class ActionBox extends Component {
    constructor(props) {
        super(props)
        this.displayText = this.props.displayText;
        this.action = this.props.action;
    }

    render() {
        return (
            <a href={this.action}>
            <div className="action-box container-fluid p-4 bg-pink text-center shadow p-3 mb-3 rounded-lg">
                {this.displayText}
            </div>
            </a>
        )
    }

}