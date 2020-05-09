import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ActionBox } from './ActionBox';
import './Study.css'

export class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
            setName: '',
            loading: true,
            currentCard: null
        };
        this.setId = this.props.match.params.id;

        this.fetchAllCards = this.fetchAllCards.bind(this);
        Study.renderCards = Study.renderCards.bind(this);
    }

    componentDidMount() {
        this.fetchAllCards();
    }

    async fetchAllCards() {
        const response = await fetch("set/study?id=" + this.setId);
        const data = await response.json();
        this.setState({
            cards: data.cards,
            setName: data.setName,
            loading: false,
            currentCard: data.cards[Math.round(Math.random() * ((data.cards.length - 1) - 0) + 0)]
        })
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
            currentCard: this.state.cards[Math.round(Math.random() * ((this.state.cards.length - 1) - 0) + 0)]
        })
    }

    static renderCards() {
        return (
        <>
            <h5 className="text-center mb-2">Now studying:
                    <br />
                {this.state.setName} ({this.state.cards.length} cards) </h5>
            <div className="stats text-center mb-2 font-weight-bold">
                <span class="text-success mr-2">Good: 1 </span>
                <span class="text-danger mr-2">Fail: 1 </span>
                <span class="text-info">Left: 4 </span>

            </div>
            <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" onClick={this.onClick} >
                {this.state.currentCard.question}
            </div>
            <div className="button-container">
                <ActionBox displayText="Show answer" onClick={this.showAnswer} />
            </div>
            <div className="answer-container">
                <div className="action-box container-fluid p-4 bg-pink text-center shadow p-1 mb-3 rounded-lg" onClick={this.onClick} >
                    {this.state.currentCard.answer}
                </div>
                <div className="answer-buttons">
                    <button className="answer-button-single btn btn-success" onClick={() => this.showNext('correct')}>Correct </button>
                    <button className="answer-button-single btn btn-danger" onClick={() => this.showNext('incorrect')}>Incorrect </button>
                    <button className="answer-button-single btn btn-info" onClick={() => this.showNext('easy')}>Easy </button>
                </div>
            </div>
        </>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : Study.renderCards();
        return (
            <div>
                {contents}   
            </div>
        )
    }
}