import React, { Component } from 'react';
import { ActionBox } from './ActionBox';

export class Study extends Component {
    constructor(props) {
        super(props);
        this.setId = this.props.match.params.id;
        this.set = JSON.parse(sessionStorage.getItem('user')).Sets.filter(x => x.ID == this.setId)[0];
        this.currentCardIndex = Math.round(Math.random() * ((this.set.Cards.length - 1) - 0) + 0);

        console.log(this.currentCardIndex);
    }

    render() {
        return (
            <div>
                {this.set.Cards[this.currentCardIndex] != undefined && 
                    <>

                    <ActionBox displayText={this.set.Cards[this.currentCardIndex].Question} />
                    <ActionBox displayText={this.set.Cards[this.currentCardIndex].Answer} />
                    </>
                }
            </div>
        )
    }
}