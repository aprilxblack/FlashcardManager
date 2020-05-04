import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);
        this.isAuthenticated = sessionStorage.getItem('isAuthenticated');
        console.log(this.isAuthenticated);
    }
    render() {
        return (
                <Layout>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/settings' component={Settings} />
                </Layout>
        ); 
        
  }
}
