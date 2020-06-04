import React, { Component } from 'react';
import './Footer.css'
import SettingsIcon from '../images/settings-icon.png';
import MuteIcon from '../images/mute-icon.png';
import UnmuteIcon from '../images/unmute-icon.png';

export class Footer extends Component {
    constructor(props) {
        super(props);
        this.username = sessionStorage.getItem('Username');
        this.state = {
            isMuted: JSON.parse(sessionStorage.getItem('isMuted'))
        }
    }

    toggleMute(isMuted) {
        this.setState({
            isMuted: isMuted
        })
        sessionStorage.setItem('isMuted', isMuted);
    }
    render() {
        return (
            <div className="footer text-white navbar border-top box-shadow p-3 fixed-bottom font-weight-bold">
                {this.username}
                <div className="float-right text-danger">
                    {!this.state.isMuted && (
                        <>
                            Mute here:
                            <img src={MuteIcon} alt={"Mute"} onClick={() => { this.toggleMute(true) }} className="icon ml-2 mr-2" />
                        </>
                    )}
                    {this.state.isMuted && (
                        <>
                            Unmute:
                            <img src={UnmuteIcon} alt={"Mute"} onClick={() => { this.toggleMute(false) }} className="icon ml-2 mr-2" />
                        </>
                        )}
                    <a href="/settings">
                        <img src={SettingsIcon} alt={"Settings"} className="icon" />
                    </a>
                </div>
            </div>
        )
    }
}
