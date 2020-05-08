import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import { TitleScreenHeader } from './TitleScreenHeader';
import PlusIcon from '../images/plus-icon.png';
import $ from 'jquery'; 

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
        }

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggleFormDisplay(formToHide, formToShow) {
        document.querySelector(formToHide).style.display = "none";
        document.querySelector(formToShow).style.display = "block";

        //clearing out error message
        this.setState({
            errorMessage: ''
        })
    }

    handleLogin(e) {
        e.preventDefault();

        const data = JSON.stringify({
             Email: this.state.email,
             Password: this.state.password,
             Username: 'placeholder'
        })

        console.log(data);

        var handleResponse = (response) => {
            //display any errors send from the server
            if (response.error != null) {
                this.setState({
                    errorMessage: response.error
                });
            }
            else {
                sessionStorage.setItem('isAuthenticated', true);
                sessionStorage.setItem('Username', response.username)
                sessionStorage.setItem('UserID', response.id);
                sessionStorage.setItem('LastOpenedSetId', response.lastOpenedSetId);
                window.location.reload();
            }
        }

        $.ajax({
            type: "POST",
            url: "user/login",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("RequestVerificationToken",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            dataType: "json",
            data: data,
            error: function (xhr) {
                console.log(xhr);
            },
            success: handleResponse
        });
    }

    handleRegister(e) {
            e.preventDefault();

             //validation

            if (this.state.username.length > 15) {
                this.setState({
                    errorMessage: "Username must not be longer than 15 characters."
                })
                return;
            }
            if (this.state.password != this.state.confirmPassword) {
                this.setState({
                    errorMessage: "Passwords do not match."
                })
                return;
            }
            if (this.state.password.length < 8) {
                this.setState({
                    errorMessage: "Password needs to have at least 8 characters."
                })
                return;
            }

            //passed validation, making a post request
        
           const data = JSON.stringify({
                Username: this.state.username,
                Email: this.state.email,
                Password: this.state.password
            });

            var handleResponse = (response) => {
               //display any errors send from the server
                if (response.error != null) {
                    this.setState({
                        errorMessage: response.error
                    });
                }
                else {
                    sessionStorage.setItem('isAuthenticated', true);
                    sessionStorage.setItem('Username', response.username)
                    sessionStorage.setItem('UserID', response.id);
                    window.location.reload();
                }
             }

            $.ajax({
                type: "POST",
                url: "user/register",
                contentType: "application/json; charset=utf-8",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("RequestVerificationToken",
                        $('input:hidden[name="__RequestVerificationToken"]').val());
                },
                dataType: "json",
                data: data,
                error: function (xhr) {
                    console.log(xhr);
                },
                success: handleResponse
            });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value }); 
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleConfirmPasswordChange(e) {
        this.setState({ confirmPassword: e.target.value });
    }

    render() {
        return (
            <div className="login-page">
                <TitleScreenHeader />
                
                <div className="container">
                    <div className="login-container text-center">
                        <form onSubmit={this.handleLogin}>
                            <h4 className="mb-3 text-center">Welcome to Flashcard Manager!</h4>
                            <ActionBox displayText="New user?" onClick={() => this.toggleFormDisplay('.login-container', '.register-container')} action="#" icon={PlusIcon} />
                            <div className="form-group">
                                <input type="email" onChange={this.handleEmailChange} className="form-control" placeholder="email" />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="password" />
                            </div>
                            <p class="text-danger"> {this.state.errorMessage} </p>
                            <button type="submit" className="submit-button btn btn-primary">Login</button>
                        </form>
                        <br />
                    </div>
                   
                    <div className="register-container text-center">
                        <h4 className="mb-3 text-center">Create an account</h4>
                        <a href="#" className="text-center" onClick={() => this.toggleFormDisplay('.register-container', '.login-container')}>Already have an account? Login...</a>
                        <form className="mt-2" onSubmit={this.handleRegister}>
                            <div className="form-group">
                                <input type="email" onChange={this.handleEmailChange} className="form-control" placeholder="your email" required />
                            </div>
                            <div className="form-group">
                                <input type="text" onChange={this.handleUsernameChange} className="form-control" placeholder="username" required />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={this.handlePasswordChange} className="form-control" placeholder="password" required />
                            </div>
                            <div className="form-group">
                                <input type="password" onChange={this.handleConfirmPasswordChange} className="form-control" placeholder="confirm password" required />
                            </div>
                            <p class="text-danger"> {this.state.errorMessage} </p>
                            <button type="submit" className="submit-button btn btn-primary">Register</button>
                        </form>
                    </div>
                </div>
                
            </div>
        )
    }
}
