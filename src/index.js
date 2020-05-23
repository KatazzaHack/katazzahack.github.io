import React from 'react';
import ReactDOM from 'react-dom';
import GameWrapper from './GameWrapper';
import Header from './Header';
import Footer from './Footer';
import * as serviceWorker from './serviceWorker';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
  	<div>
    	<Header />
    	<GameWrapper />
    	<Footer />
    </div>
  </React.StrictMode>,
  document.getElementById('content')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
