import React, { Component } from 'react';
import './ActionBox.css'
import { Link } from 'react-router-dom';

export class ActionBox extends Component {
    constructor(props) {
        super(props)
        this.displayText = this.props.displayText;
        this.action = this.props.action;
        this.icon = this.props.icon;
        this.onClick = this.props.onClick
        this.playSound = this.playSound.bind(this);

    }

    render() {
        return (
            <Link to={this.action}>
                <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" onClick={() => {
                    if (this.onClick != undefined) {
                        this.onClick();
                    }
                    this.playSound();
                }} >
                    {this.displayText}
                    {this.icon != null && (<><img src={this.icon} className="icon ml-2 mr-2 float-left"/></>)}
                </div>
            </Link>
        )
    }

    playSound() {
        if (!JSON.parse(sessionStorage.getItem('isMuted'))) {
            var click = new Audio('/sounds/click.mp3');
            click.play();
        }
    }

}