import React, { Component } from 'react';
import { Home } from './Home';

export class Profile extends Component {

    constructor(props) {
        super(props);
        this.fetchUserData = this.fetchUserData.bind(this);
        this.userId = sessionStorage.getItem('UserID');
        this.state = {
            username: '',
            email: '',
            numberOfSets: 0,
            loading: true
        }
        Profile.renderUserProfile = Profile.renderUserProfile.bind(this);
    }

    logOut() {
        sessionStorage.clear();
        window.location.replace('/');
    }

    componentDidMount() {
        this.fetchUserData();
    }

    async fetchUserData() {
        const response = await fetch("user/get-profile-data?userId=" + this.userId);
        const data = await response.json();
        this.setState({
            username: data.username,
            email: data.email,
            numberOfSets: data.numberOfSets,
            loading: false
        })
    }

    static renderUserProfile() {
        return (
            <div>
                <h4 className="text-center mb-3"> User Profile </h4>
                <p><b>Username: </b>{this.state.username}
                </p>
                <p><b>Email: </b>{this.state.email}
                </p>
                <p><b>Number of sets created: </b>{this.state.numberOfSets}
                </p>
                <button className="submit-button btn btn-primary" onClick={this.logOut}> Log out </button>
            </div>
            )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p> : Profile.renderUserProfile();
        return (
            <div>
                {contents}
            </div>
        )
    }
}