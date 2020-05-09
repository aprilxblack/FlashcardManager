import React, { Component } from 'react';

export class Profile extends Component {

    logOut() {
        sessionStorage.clear();
        window.location.replace('/');
    }

    render() {
        return (
            <div>
                This is user's profile
                <br />
                <button className="submit-button btn btn-primary" onClick={this.logOut}> Log out </button>
            </div>
        )
    }
}