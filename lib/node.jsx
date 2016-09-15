  import React from 'react';

  class Node extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let cName = `node ${this.props.type}`;

      return(
        <li className={cName} onMouseOver={this.props.handleClick} >

        </li>
      );
    }

  }


export default Node;
