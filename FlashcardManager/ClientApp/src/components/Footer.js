import React, { Component } from 'react';
import './Footer.css'
import SettingsIcon from '../images/settings-icon.png';
import MuteIcon from '../images/mute-icon.png';

export class Footer extends Component {
    render() {
        return (
            <div className="footer text-white navbar border-top box-shadow p-3 fixed-bottom font-weight-bold">
                Username
                <div className="float-right text-danger">
                    Mute here:
                    <img src={MuteIcon} alt={"Mute"} className="icon ml-2 mr-2" />
                    <img src={SettingsIcon} alt={"Settings"} className="icon" />
                </div>
            </div>
        )
    }
}
