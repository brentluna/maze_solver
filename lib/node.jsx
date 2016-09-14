  import React from 'react';

  class Node extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      let cName = `node ${this.props.type}`;
      let content = '';
      if (this.props.type === 'shortest') { content = '+'}
      return(
        <li className={cName} onClick={this.props.handleClick} >
          {content}
        </li>
      );
    }

  }


export default Node;
