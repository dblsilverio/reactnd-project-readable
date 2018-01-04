import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux'

import reducers from './reducers';

import './assets/css/navbar-top.css';
import './assets/css/leitura.css';

import './bootstrap-assets';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/ui/Navbar';

import Index from './components/Index';
import Categoria from './components/Categoria';
import Post from './components/Post';
import Novo from './components/Novo';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Route exact path="/" component={Index} />
                <Route path="/novo" component={Novo} />
                <Route exact path="/posts/:id" component={Post} />
                <Route path="/posts/:id/edit" component={Novo} />
                <Route path="/categoria/:name" component={Categoria} />
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

