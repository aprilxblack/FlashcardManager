import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import PlusIcon from '../images/plus-icon.png';

export class BrowseSets extends Component {

    constructor(props) {
        super(props);
        this.sets = JSON.parse(sessionStorage.getItem('user')).Sets;
    }

    render() {
        return (
            <div>
                <h4 className="mb-2 text-center">Click on a set to study:</h4>
                {this.sets.length > 3 && (
                    <>
                        <h5 className="mb-3 text-center">(scroll down to see more)</h5>
                    </>
                 )}
                {this.sets.map((set, i) => (
                    <ActionBox displayText={set.Name} action={"/study/" + set.ID} />
                ))}
                {this.sets.length == 0 && (
                    <>
                        <h4 className="mt-3 text-center">You have no sets! Would you like to create one? </h4>
                    </>
                 )}
                <ActionBox icon={PlusIcon} displayText="Add a new set" action="/" />
            </div>
        )
    }
}