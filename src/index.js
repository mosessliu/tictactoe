import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/game'
import './index.css';

const destination = document.querySelector('#container');
ReactDOM.render(<Game />, destination);