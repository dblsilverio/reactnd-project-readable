import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import './assets/css/navbar-top.css';

import './bootstrap-assets';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/ui/Navbar';

import Index from './components/Index';
import Categoria from './components/Categoria';
import Novo from './components/Novo';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <BrowserRouter>
        <div className="app">
            <Navbar />
            <Route exact path="/" render={() => (
                <Index />
            )} />
            <Route path="/novo" render={() => (
                <Novo />
            )} />
            <Route path="/categoria/:name" component={Categoria} />
        </div>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
