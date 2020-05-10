import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ActionBox } from './ActionBox';
import './Study.css'
import $ from 'jquery'; 


export class Study extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: null,
            setName: '',
            loading: true,
            currentCard: null,
            stats: null
        };
        this.setId = this.props.match.params.id;

        this.fetchAllCards = this.fetchAllCards.bind(this);
        Study.renderCards = Study.renderCards.bind(this);
        this.updateCardStats = this.updateCardStats.bind(this);
    }

    componentDidMount() {
        this.fetchAllCards();
    }

    async fetchAllCards() {
        const response = await fetch("set/study?id=" + this.setId, {
            method: 'get'
        });
        const data = await response.json();
        console.log(data);
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


    handleAnswer(status) {

        var stats = {
            ID: this.state.currentCard.id,
            SetID: this.setId,
            Question: this.state.currentCard.question,
            Answer: this.state.currentCard.answer,
            IsEasy: this.state.currentCard.isEasy,
            IsKnown: this.state.currentCard.isKnown,
            CorrectAnswersNo: this.state.currentCard.correctAnswersNo,
            IncorrectAnswersNo: this.state.currentCard.incorrectAnswersNo
        }

        switch (status) {
            case 'correct':
                stats.CorrectAnswersNo++;
                if (stats.CorrectAnswersNo >= 2) {
                    stats.isKnown = true;
                }
                break;
            case 'incorrect':
                stats.IncorrectAnswersNo++;
                break;
            case 'easy':
                stats.IsEasy = true;
                stats.IsKnown = true;
                break;
        }

        this.updateCardStats(stats);

    }

    async updateCardStats(stats) {

        console.log(JSON.stringify(stats));

        const response = await $.ajax({
            type: "POST",
            url: "card/update-stats",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("RequestVerificationToken",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            dataType: "json",
            data: JSON.stringify(stats)
        });

        const data = await response
        console.log(data);
        this.setState({
            cards: data.cards,
            currentCard: this.state.cards[Math.round(Math.random() * ((this.state.cards.length - 1) - 0) + 0)]
        })

        var answer = document.querySelector('.answer-container');
        var button = document.querySelector('.button-container');

        answer.style.display = "none";
        button.style.display = "block";
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
                        <button className="answer-button-single btn btn-success" onClick={() => this.handleAnswer('correct')}>Correct </button>
                        <button className="answer-button-single btn btn-danger" onClick={() => this.handleAnswer('incorrect')}>Incorrect </button>
                        <button className="answer-button-single btn btn-info" onClick={() => this.handleAnswer('easy')}>Easy </button>
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