import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
let isAuthenticated = sessionStorage.getItem('isAuthenticated');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        {isAuthenticated ? <App /> : <Login/>}
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

