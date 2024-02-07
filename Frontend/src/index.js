import React from 'react'
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import App1 from './Components/App1'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";



const container = document.getElementById('root')

ReactDom.render(
    <Provider store={store}>
        <App1></App1>
    </Provider>
    , container)

