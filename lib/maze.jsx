import React from 'react';
import Node from './node';

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.mapGrid = this.mapGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.unsolved = true;
    this.solve = this.solve.bind(this);
    this.reset = this.reset.bind(this);
    this.path = {};
    this.state = { unsolved: true, maze: this.blankMaze()};
  }

  blankMaze() {
    let maze = [];
    for (let i = 0; i < 10; i++) {
      maze.push([]);
      for (let j = 0; j < 10; j++) {
        maze[i].push('path');
      }
    }
    maze[0][0] = 'start';
    maze[9][9] = 'finish';
    return maze;
  }

  findShortestPath() {
    const shortestPath = [this.path['9,9']];
    while ((shortestPath.slice(-1)[0][0] !== 0) || (shortestPath.slice(-1)[0][1] !== 0)) {
      let endEl = shortestPath.slice(-1)[0];
      let elKey = endEl.join();
      shortestPath.push(this.path[elKey]);
    }
    let idx = 0;
    let pathInterval = setInterval(() => {

      if (idx < shortestPath.length) {
        let newMaze = this.state.maze;
        let coords = shortestPath[idx];
        newMaze[coords[0]][coords[1]] = 'shortest';
        this.setState({maze: newMaze});
        idx++;
      } else {

        clearInterval(pathInterval);
      }
    }, 50);

  }


  handleClick(coords, e) {
    if (this.state.maze[coords[0]][coords[1]] === 'path') {
      let newMaze = this.state.maze;
      newMaze[coords[0]][coords[1]] = 'wall';
      this.setState({maze: newMaze});

    }

  }

  isValidPos(pos) {
    if (pos[0] < 0 || pos[1] < 0) {
      return false;
    }
    if (pos[0] > 9 || pos[1] > 9) {
      return false;
    }
    let inValidTypes = ['wall', 'checking', 'start', 'child'];
    let posValue = this.state.maze[pos[0]][pos[1]];
    if (inValidTypes.includes(posValue)) {
      return false;
    }
    return true;
  }

  findChildren(pos) {
    let children = [];
    let deltas = [-1, 1];
    let x = pos[0];
    let y = pos[1];

    deltas.forEach(delta => {
      let newPos = [(x + delta), y];
      if (this.isValidPos(newPos)) {
        children.push(newPos);
      }
    });
    deltas.forEach(delta => {
      let newPos = [x, (y + delta)];
      if (this.isValidPos(newPos)) {
        children.push(newPos);
      }
    });
    children.forEach(child => {
      this.path[child.join()] = pos;
      this.markAsChild(child);
    });
    return children;
  }

  markAsChild(pos) {
    if (this.state.maze[pos[0]][pos[1]] !== 'finish') {
      let newMaze = this.state.maze;
      newMaze[pos[0]][pos[1]] = 'child';
      this.setState({maze: newMaze});
    }
  }

  checkPos(pos) {
    let newMaze = this.state.maze;
    let posValue = newMaze[pos[0]][pos[1]];

    if (posValue === 'finish') {
      this.unsolved = false;
      this.setState({unsolved: false});

    } else if (posValue !== 'start') {
      newMaze[pos[0]][pos[1]] = 'checking';

    }

    this.setState({maze: newMaze});
  }

  solve(e) {
    e.preventDefault();
    let queue = [[0, 0]];

    let solveInterval = setInterval(() => {
      if (this.unsolved && queue.length) {
        let parent = queue.shift();
        let newChildren = this.findChildren(parent);
        queue.push(...newChildren);
        this.checkPos(parent);
      } else {
        clearInterval(solveInterval);
        console.log('outside');
        this.findShortestPath();
      }
    }, 100);
  }

  reset(e) {
    e.preventDefault();
    this.unsolved = true;
    this.path = {};
    this.setState({maze: this.blankMaze(), unsolved: true});
  }

  mapGrid() {
    const nodes = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let type = this.state.maze[i][j];
        let key = `${i}${j}`;
        nodes.push(<Node type={type} coords={[i, j]} handleClick={this.handleClick.bind(this, [i, j])} key={key}/>);
      }
    }
    return nodes;
  }

  render() {

    return(
      <div>
        <ul className='grid-ul'>
          {this.mapGrid()}
        </ul>
        <button onClick={this.solve} >Solve</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}

export default Maze;
