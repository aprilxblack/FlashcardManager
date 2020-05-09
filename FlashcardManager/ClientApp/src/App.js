import React, { Component, useState } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import './custom.css'
import { BrowseSets } from './components/BrowseSets';
import { Study }  from './components/Study';
import { CreateASet } from './components/CreateASet';
import { EditSet } from './components/EditSet';

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
                    <Route path='/fetch-data' component={FetchData} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/settings' component={Settings} />
                    <Route path='/browse-sets' component={BrowseSets} />
                    <Route path='/study/:id' component={Study} />
                    <Route path='/create-a-set' component={CreateASet} />
                    <Route path='/edit-set/:id' component={EditSet} />
                </Layout>
        ); 
        
  }
}
