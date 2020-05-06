import React, { Component } from 'react';
import './Footer.css'
import SettingsIcon from '../images/settings-icon.png';
import MuteIcon from '../images/mute-icon.png';

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.user = JSON.parse(sessionStorage.getItem('user'));
    }
    render() {
        return (
            <div className="footer text-white navbar border-top box-shadow p-3 fixed-bottom font-weight-bold">
                {this.user.Username}
                <div className="float-right text-danger">
                    Mute here:
                    <img src={MuteIcon} alt={"Mute"} className="icon ml-2 mr-2" />
                    <a href="/settings">
                        <img src={SettingsIcon} alt={"Settings"} className="icon" />
                    </a>
                </div>
            </div>
        )
    }
}
