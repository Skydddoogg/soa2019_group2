import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import TutorProfile from './Pages/TutorProfile';
import Search from './Pages/Search';
import Register from './Pages/Register'
import Home from './Pages/Home'
import './Assets/css/animate.css'

ReactDOM.render(<Search/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
