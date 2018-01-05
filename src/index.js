import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

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
import Category from './components/Category';
import Post from './components/Post';
import New from './components/New';

import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div className="app">
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Index} />
                    <Route exact path="/new" component={New} />
                    <Route exact path="/:category/:id" component={Post} />
                    <Route exact path="/:name" component={Category} />
                    <Route exact path="/:category/:id/edit" component={New} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();

