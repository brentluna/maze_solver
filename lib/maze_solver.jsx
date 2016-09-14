import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');

  ReactDOM.render(<Game />, rootEl);
});
