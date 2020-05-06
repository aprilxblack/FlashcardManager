import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ActionBox } from './ActionBox';
import './Study.css'

export class Study extends Component {
    constructor(props) {
        super(props);
        this.setId = this.props.match.params.id;
        this.set = JSON.parse(sessionStorage.getItem('user')).Sets.filter(x => x.ID == this.setId)[0];
        this.state = {
            currentCard: this.set.Cards[Math.round(Math.random() * ((this.set.Cards.length - 1) - 0) + 0)]
        };
    }

    showAnswer() {
        var answer = document.querySelector('.answer-container');
        var button = document.querySelector('.button-container');

        answer.style.display = "block";
        button.style.display = "none";
    }


    showNext(status) {
        var answer = document.querySelector('.answer-container');
        var button = document.querySelector('.button-container');

        answer.style.display = "none";
        button.style.display = "block";

        switch (status) {
            case 'correct':
                console.log(status);
                break;
            case 'incorrect':
                console.log(status);
                break;
            case 'easy':
                console.log(status);
                break;
        }

        this.setState({
            currentCard: this.set.Cards[Math.round(Math.random() * ((this.set.Cards.length - 1) - 0) + 0)]
        })
    }


    render() {
        return (
            <div>
                    <>
                    <h5 className="text-center mb-2">Now studying:
                    <br />
                        {this.set.Name} ({this.set.Cards.length} cards) </h5>
                    <div className="stats text-center mb-2 font-weight-bold">
                        <span class="text-success mr-2">Good: 1 </span>
                        <span class="text-danger mr-2">Fail: 1 </span>
                        <span class="text-info">Left: 4 </span>

                    </div>
                    <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" onClick={this.onClick} >
                        {this.state.currentCard.Question}
                    </div>
                    <div className="button-container">
                        <ActionBox displayText="Show answer" onClick={this.showAnswer}/>
                    </div>
                    <div className="answer-container">
                        <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" onClick={this.onClick} >
                            {this.state.currentCard.Answer}
                        </div>
                        <div className="answer-buttons">
                            <button className="answer-button-single btn btn-success" onClick={() => this.showNext('correct')}>Correct </button>
                            <button className="answer-button-single btn btn-danger" onClick={() => this.showNext('incorrect')}>Incorrect </button>
                            <button className="answer-button-single btn btn-info" onClick={() => this.showNext('easy')}>Easy </button>
                        </div>
                    </div>
                    </>
            </div>
        )
    }
}