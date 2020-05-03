import React, { Component } from 'react';
import { ActionBox } from './ActionBox';
import ContinueIcon from '../images/continue-icon.png';
import SearchIcon from '../images/search-icon.png';
import PlusIcon from '../images/plus-icon.png';

export class Home extends Component {
    static displayName = Home.name;
    constructor(props) {
        super(props);
        this.lastOpenedSet = this.props.lastOpenedSet;
    }
    handleClick() {
        console.log('click');
    }
  render () {
    return (
      <div>
            <h4 className="mb-3">Hi Username! What would you like to do today?</h4>
            <ActionBox displayText="Continue Learning" onClick={this.handleClick} action="#" icon={ContinueIcon} />
            <ActionBox displayText="Browse Sets" action="/counter" icon={SearchIcon} />
            <ActionBox displayText="Create a Set" action="/counter" icon={PlusIcon} /> 
      </div>
    );
  }
}