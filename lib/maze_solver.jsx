import React from 'react';
import ReactDOM from 'react-dom';
import Maze from './maze';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');

  ReactDOM.render(<Maze />, rootEl);
});
