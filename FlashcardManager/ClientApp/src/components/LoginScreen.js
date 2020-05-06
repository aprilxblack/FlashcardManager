import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import { TitleScreenHeader } from './TitleScreenHeader';
import PlusIcon from '../images/plus-icon.png';

var user = {
    'Username': 'Karolina',
    'UserID': 2,
    'Sets': [
        {
            ID: 1,
            Name: 'Japanese words',
            Cards: [
                {
                    ID: 1,
                    Question: 'konnichiwa',
                    Answer: 'good afternoon'
                },
                {
                    ID: 2,
                    Question: 'ohayo',
                    Answer: 'good morning'
                },
                {
                    ID: 3,
                    Question: 'pan',
                    Answer: 'bread'
                },
                {
                    ID: 4,
                    Question: 'ai',
                    Answer: 'love',
                },
                {
                    ID: 5,
                    Question: 'neko',
                    Answer: 'cat'
                }
            ]
        },
        {
            ID: 2,
            Name: 'Cat breeds',
            Cards: [
                {
                    ID: 1,
                    Question: 'grey cat',
                    Answer: 'british shorthair'
                },
                {
                    ID: 2,
                    Question: 'big cat',
                    Answer: 'maine coon'
                }
            ]
        }
    ]
}

export default class LoginScreen extends Component {
    toggleFormDisplay(formToHide, formToShow) {
        document.querySelector(formToHide).style.display = "none";
        document.querySelector(formToShow).style.display = "block";
    }

    handleLogin() {
        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log('login');
    }

    handleRegister() {

        sessionStorage.setItem('isAuthenticated', true);
        sessionStorage.setItem('user', JSON.stringify(user));
        console.log('register');
    }

    render() {
        return (
            <div className="login-page">
                <TitleScreenHeader />
                
                <div className="container">
                    <div className="login-container">
                        <form onSubmit={this.handleLogin}>
                            <h4 className="mb-3 text-center">Welcome to Flashcard Manager!</h4>
                            <ActionBox displayText="New user?" onClick={() => this.toggleFormDisplay('.login-container', '.register-container')} action="#" icon={PlusIcon} />
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="email" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="password" />
                            </div>
                            <button type="submit" className="submit-button btn btn-primary">Login</button>
                        </form>
                        <br />
                    </div>
                   
                    <div className="register-container text-center">
                        <h4 className="mb-3 text-center">Create an account</h4>
                        <a href="#" className="text-center" onClick={() => this.toggleFormDisplay('.register-container', '.login-container')}>Already have an account? Login...</a>
                        <form className="mt-2" onSubmit={this.handleRegister}>
                            <div className="form-group">
                                <input type="email" className="form-control" placeholder="your email" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="password" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="confirm password" />
                            </div>
                            <button type="submit" className="submit-button btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}
