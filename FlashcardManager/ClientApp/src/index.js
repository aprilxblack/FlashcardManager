import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import LoginScreen from './components/LoginScreen';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
let isAuthenticated = sessionStorage.getItem('isAuthenticated');

ReactDOM.render(
    <BrowserRouter basename={baseUrl}>
        {isAuthenticated ? <App /> : <LoginScreen/>}
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

