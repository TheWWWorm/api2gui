'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import config from '../../lib/config';

import App from './components/App';
import store from './store';

const app = document.getElementById('app')

ReactDOM.render(<Provider store={store}>
    <BrowserRouter basename={config.basePath}>
        <App />
    </BrowserRouter>
</Provider>, app);
