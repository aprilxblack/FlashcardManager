import React, { Component } from 'react';
import './ActionBox.css'

export class ActionBox extends Component {
    constructor(props) {
        super(props)
        this.displayText = this.props.displayText;
        this.action = this.props.action;
        this.icon = this.props.icon;
        this.onClick = this.props.onClick;
    }

    render() {
        return (
            <a href={this.action}>
                <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" onClick={this.onClick} >
                    {this.displayText}
                    {this.icon != null && (<><img src={this.icon} className="icon ml-2 mr-2 float-left"/></>)}
            </div>
            </a>
        )
    }

}