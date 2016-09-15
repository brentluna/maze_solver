import React from 'react';
import Modal from 'react-modal';
import Maze from './maze';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalIsOpen: true};
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <h1>Solve My Maze</h1>
        <Maze />
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 className='modal-title'>Solve My Maze</h2>
          <div>Make maze walls by dragging mouse across cells. Choose wich algorithm you wish to solve it, Breadth First Search or Depth First Search</div>
          <button className='modal-button' onClick={this.closeModal}>close</button>

        </Modal>

      </div>
    );
  }
}

export default Game;
