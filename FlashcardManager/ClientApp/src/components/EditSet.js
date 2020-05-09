import React, { Component } from 'react';
import $ from 'jquery'; 

export class EditSet extends Component {
    constructor(props) {
        super(props);
        this.setId = this.props.match.params.id;
        this.state = {
            setName: '',
            cards: [],
            loading: true
        }
    }

    componentDidMount() {
        this.populateSetData();
    }

    async populateSetData() {
        const response = await fetch("set/edit?id=" + this.setId);
        const data = await response.json();
        this.setState({
            setName: data.setName,
            cards: data.cards,
            loading: false
        })
    }

    static renderSetData(setName, cards) {
        return (
            <>
            <h4> Editing set: {setName} </h4>
                {cards.map(card => (
                    <>
                        <p>card.Question </p>
                        <p>card.Answer </p>
                    </>
                ))}
            </>
        )
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : EditSet.renderSetData(this.state.setName, this.state.cards);
        return (
            <div className="text-center">
                {contents}
            </div>
        )
    }
}