import React from 'react';
import Node from './node';
import Solver from './dfs';

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.mapGrid = this.mapGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.unsolved = true;
    this.solveBfs = this.solveBfs.bind(this);
    this.dfsPath = [];
    this.solveDfs = this.solveDfs.bind(this);
    this.reset = this.reset.bind(this);
    this.resetButton = this.resetButton.bind(this);
    this.path = {};
    this.state = { unsolved: true, maze: this.blankMaze(), mouseDown: false, solving: false};
    this.mUp = this.mUp.bind(this);
    this.mDown = this.mDown.bind(this);
    this.randomMazeButton = this.randomMazeButton.bind(this);
    this.randomMaze = this.randomMaze.bind(this);
  }

  blankMaze() {
    let maze = [];
    for (let i = 0; i < 20; i++) {
      maze.push([]);
      for (let j = 0; j < 20; j++) {
        maze[i].push('path');
      }
    }
    maze[0][0] = 'start';
    maze[19][19] = 'finish';
    return maze;
  }

  randomMaze() {
    let maze = this.blankMaze();
    const invalidCoord = [[0, 0], [19, 19], [0, 1], [1,0], [19, 18], [18, 19]]
    let coords = [];
    while (coords.length < 80) {
      let newCoord = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)]
      if (!this.includeCoords(coords, newCoord) && !this.includeCoords(invalidCoord, newCoord)) {
        coords.push(newCoord);
      }
    }
    coords.forEach(coord => {
      maze[coord[0]][coord[1]] = 'wall';
    });
    return maze;
  }

  randomMazeButton(e) {
    e.preventDefault();
    this.setState({maze: this.randomMaze()});
  }

  includeCoords(array, coords) {
    for (let i = 0; i < array.length; i++) {
      let curr = array[i] 
      if (curr[0] == coords[0] && curr[1] == coords[1]) {
        return true;
      }
    }
    return false;
  }

  handleClick(coords, e) {
    if (!this.state.solving && this.state.mouseDown &&  this.state.maze[coords[0]][coords[1]] === 'path') {
      let newMaze = this.state.maze;
      newMaze[coords[0]][coords[1]] = 'wall';
      this.setState({maze: newMaze});

    }

  }


  solveBfs(e) {
    console.log('solvedfs');
    e.preventDefault();

    if (!this.state.solving) {
      this.setState({solving: true});

        const bfsSolver = new Solver(this.state.maze);

        let result = bfsSolver.bfs();
        if (result) {
          this.traceDFS(result.path, result.nodes.slice(-1)[0]);
          this.setState({solving: false});

        } else {
          this.setState({solving: false}, () => {
            this.reset();
          });
          alert('Unsolvable');

        }

    }
  }



  solveDfs(e) {
    console.log('solvedfs');
    e.preventDefault();

    if (!this.state.solving) {
      this.setState({solving: true});

        const dfsSolver = new Solver(this.state.maze);

        let result = dfsSolver.dfs();
        if (result) {
          this.traceDFS(result.path, result.nodes.slice(-1)[0]);
          this.setState({solving: false});
        } else {
          this.setState({solving: false}, () => {
            this.reset();
          });
          alert('Unsolvable');
        }
    }
  }

  traceDFS(dfsPath, node) {

    let idx = 1;
    const that = this;
    let dfsInterval = setInterval(() => {
      if (idx < dfsPath.length - 1) {
        let pos = dfsPath[idx];
        let newMaze = that.state.maze;
        newMaze[pos[0]][pos[1]] = 'checking';
        that.setState({maze: newMaze});
        idx++;
      } else {
        clearInterval(dfsInterval);
        that.findShortestPath(node);
      }
    }, 20);
  }

  findShortestPath(node) {
    let path = [node.parent];
    while (path.slice(-1)[0].parent.value !== 'start') {
      let parentNode = path.slice(-1)[0].parent;
      path.push(parentNode);
    }
    let idx = 0;
    let pathInterval = setInterval(() => {
      if (idx < path.length) {
        let nodePos = path[idx].pos;
        let newMaze = this.state.maze;
        newMaze[nodePos[0]][nodePos[1]] = 'shortest';
        this.setState({maze: newMaze});
        idx++;
      } else {
        clearInterval(pathInterval);
      }
    }, 50);
  }



  reset() {
    if (!this.state.solving) {
      this.unsolved = true;
      this.path = {};
      this.dfsPath = [];
      this.setState({maze: this.blankMaze(), unsolved: true});
    }
  }

  resetButton(e) {
    e.preventDefault();
    this.reset();
  }

  mapGrid() {
    const nodes = [];
    let key = '';
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        let type = this.state.maze[i][j];
        key = key + 'a';
        nodes.push(<Node type={type} coords={[i, j]} handleClick={this.handleClick.bind(this, [i, j])} mouseDown={this.state.mouseDown} key={key}/>);
      }
    }
    return nodes;
  }

  mUp() {
    this.setState({mouseDown: true});
  }
  mDown() {
    this.setState({mouseDown: false});
  }

  render() {

    return(
      <div>
        <ul className='grid-ul' onMouseDown={this.mUp} onMouseUp={this.mDown}>
          {this.mapGrid()}
        </ul>
        <div className='button-div'>
          <div className='left-buttons'>
            <button className='button' onClick={this.solveBfs} >Solve BFS</button>
            <button className='button' onClick={this.solveDfs} >Solve DFS</button>
          </div>
          <div className='right-buttons'>
            <button className='button' onClick={this.randomMazeButton} >Random Maze</button>
            <button className='button' onClick={this.resetButton}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Maze;
