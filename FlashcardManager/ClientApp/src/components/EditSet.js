import React, { Component } from 'react';
import $ from 'jquery'; 

export class EditSet extends Component {
    constructor(props) {
        super(props);
        this.setId = this.props.match.params.id;
        this.state = {
            set: null,
            cards: [],
            loading: true,
            newQuestion: '',
            newAnswer: ''
        }

        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        EditSet.renderSetData = EditSet.renderSetData.bind(this);
        this.addCard = this.addCard.bind(this);
    }

    componentDidMount() {
        this.populateSetData();
    }

    async populateSetData() {
        const response = await fetch("set/edit?id=" + this.setId);
        const data = await response.json();
        this.setState({
            set: data.set,
            cards: data.cards,
            loading: false
        })
    }

    addCard(e) {
        e.preventDefault();
        console.log('submitted');
    }

    handleQuestionChange(e) {
        this.setState({
            newQuestion: e.target.value
        })
    }

    handleAnswerChange(e) {
        this.setState({
            newAnswer: e.target.value
        })
    }

    async addCard(e) {
        e.preventDefault();

        var data = {
            SetID: this.state.set.id,
            Question: this.state.newQuestion,
            Answer: this.state.newAnswer,
            IsEasy: false,
            IsKnown: false
        }

        var updateState = (response) => {
            this.setState({
                cards: response.cards
            })
        }

        $.ajax({
            type: "POST",
            url: "card/create",
            contentType: "application/json; charset=utf-8",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("RequestVerificationToken",
                    $('input:hidden[name="__RequestVerificationToken"]').val());
            },
            dataType: "json",
            data: JSON.stringify(data),
            error: function (xhr) {
                console.log(xhr);
            },
            success: function (xhr) {
                updateState(xhr);
            }
        });
    }

    static renderSetData() {

        return (
            <>
                <h4> Editing set: {this.state.set.name} </h4>
                <form className="mt-2 mb-3">
                    <input type="text" onChange={this.handleQuestionChange} className="form-control mb-3" placeholder="question" required />
                    <input type="text" onChange={this.handleAnswerChange} className="form-control mb-3" placeholder="answer" required />
                    <button type="button" onClick={this.addCard} className="submit-button btn btn-primary mb-3">Add</button>
                </form>

                {this.state.cards.length == 0 && (
                    <h4> This set has no cards! </h4>
                )}
                
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Question</th>
                            <th scope="col">Answer </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cards.map((card, index) => (
                            <tr>
                                <td>{card.question} </td>
                                <td>{card.answer} </td>
                         </tr>
                         ))}
                    </tbody>
                </table>
                
            </>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : EditSet.renderSetData();
        return (
            <div className="text-center">
                {contents}
            </div>
        )
    }
}