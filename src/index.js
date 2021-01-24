import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import reducer from './store/reducers/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer, 
    composeEnhancers(applyMiddleware(thunk)));


const app = (
    <Provider store={store}>
        <BrowserRouter basename="/horses-frontend">
            <App />
        </BrowserRouter>
    </Provider>
    );

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
