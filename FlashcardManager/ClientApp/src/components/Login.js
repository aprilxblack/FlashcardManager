import React, { Component } from 'react';

export default class Login extends Component {
    handleClick() {
        sessionStorage.setItem('username', 'Karolina');
        sessionStorage.setItem('isAuthenticated', true);
        window.location.reload();
    }
    render() {
        return (
            <button onClick={this.handleClick}> Click me</button>
        )
    }
}
