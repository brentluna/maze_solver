import React from 'react';
import Modal from 'react-modal';
import Maze from './maze';
import GitHub from 'react-icons/lib/fa/github';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width : '600px',
    background: '#F7A278'
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
        <div className='main'>
          <h1>Solve My Maze</h1>
          <Maze />
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles} >

            <h2 className='modal-title'>Solve My Maze</h2>
            <div>Make maze walls by dragging mouse across cells. Choose wich algorithm you wish to solve it, an iterative Breadth First Search or recursive Depth First Search</div>
            <button className='modal-button' onClick={this.closeModal}>close</button>

          </Modal>
          <footer className='footer'>
            <div>Made by Brent Luna</div>
            <div><a className='github-icon' target='_blank' href='https://github.com/brentluna/SimplyTech'>
              <GitHub />
            </a></div>
          </footer>
        </div>
      </div>
    );
  }
}

export default Game;
