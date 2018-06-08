import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board'
import './index.css';

const destination = document.querySelector('#container');
ReactDOM.render(<Board />, destination);