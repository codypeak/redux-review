import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './index.css'
import App from './components/App'
import reducer from './reducers';
import middleware from './middleware';

//takes in root reducer and returns store
const store = createStore(reducer, middleware)

//pass in store as props to provider component
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'))