import React, { Component } from 'react';
import { ActionBox } from './ActionBox';

export class BrowseSets extends Component {

    constructor(props) {
        super(props);
        this.sets = JSON.parse(sessionStorage.getItem('user')).Sets;
    }

    render() {
        return (
            <div>
                <h4 className="mb-1 text-center">Click on a set to study:</h4>
                <h5 className="mb-3 text-center">(scroll down to see more)</h5>
                {this.sets.map((set, i) => (
                    <ActionBox displayText={set.Name} action={"/study/" + set.ID} />
                ))}
            </div>
        )
    }
}