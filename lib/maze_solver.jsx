import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import Modal from 'react-modal';

document.addEventListener('DOMContentLoaded', () => {
  Modal.setAppElement(document.body);
  const rootEl = document.getElementById('root');

  ReactDOM.render(<Game />, rootEl);
});
