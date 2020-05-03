import React, { Component } from 'react';
import { ActionBox } from './ActionBox';

export class Home extends Component {
    static displayName = Home.name;

  render () {
    return (
      <div>
            <h3 className="mb-3">Hi! What would you like to do today?</h3>
            <ActionBox displayText="Continue Learning" action="/counter" /> 
            <ActionBox displayText="Browse Sets" action="/counter" /> 
            <ActionBox displayText="Create a Set" action="/counter" /> 
      </div>
    );
  }
}