import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import { TitleScreenHeader } from './TitleScreenHeader';
import PlusIcon from '../images/plus-icon.png';

export default class Login extends Component {
    handleClick() {
        sessionStorage.setItem('username', 'Karolina');
        sessionStorage.setItem('isAuthenticated', true);
        window.location.reload();
    }
    render() {
        return (
            <div className="login-page">
                <TitleScreenHeader />
                
                <div className="container">
                    <form>
                        <h4 className="mb-3 text-center">Welcome to Flashcard Manager!</h4>
                        <ActionBox displayText="New user?" onClick={this.handleClick} action="#" icon={PlusIcon} />
                        <div className="form-group">
                            <input type="email" className="form-control" placeholder="email" />
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" placeholder="password" />
                        </div>
                        <button type="submit" className="submit-button btn btn-primary">Login</button>
                    </form>
                    <br/>
                </div>
            </div>
        )
    }
}
