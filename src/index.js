import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'

import WebFont from 'webfontloader';
import App from "./App";

WebFont.load({
    google: {
        families: ['Lato:400,700', 'sans-serif']
    }
});

ReactDOM.render(
    <Router>
        <App/>
    </Router>, document.getElementById('root'))