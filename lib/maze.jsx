import React from 'react';
import Node from './node';
import Solver from './dfs';

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.mapGrid = this.mapGrid.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.unsolved = true;
    this.bfs = this.bfs.bind(this);
    // this.dfs = this.dfs.bind(this);
    this.dfsPath = [];
    this.solveDfs = this.solveDfs.bind(this);
    this.reset = this.reset.bind(this);
    this.path = {};
    this.state = { unsolved: true, maze: this.blankMaze(), mouseDown: false, solving: false};
    this.mUp = this.mUp.bind(this);
    this.mDown = this.mDown.bind(this);
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
  //
  // findShortestPath() {
  //   const shortestPath = [this.path['19,19']];
  //   while ((shortestPath.slice(-1)[0][0] !== 0) || (shortestPath.slice(-1)[0][1] !== 0)) {
  //     let endEl = shortestPath.slice(-1)[0];
  //     let elKey = endEl.join();
  //     shortestPath.push(this.path[elKey]);
  //   }
  //   let idx = 0;
  //   shortestPath.pop();
  //   shortestPath.reverse();
  //   let pathInterval = setInterval(() => {
  //
  //     if (idx < shortestPath.length) {
  //       let newMaze = this.state.maze;
  //       let coords = shortestPath[idx];
  //       newMaze[coords[0]][coords[1]] = 'shortest';
  //       this.setState({maze: newMaze});
  //       idx++;
  //     } else {
  //
  //       clearInterval(pathInterval);
  //       this.setState({solving: false});
  //     }
  //   }, 50);
  //
  // }


  handleClick(coords, e) {
    if (!this.state.solving && this.state.mouseDown &&  this.state.maze[coords[0]][coords[1]] === 'path') {
      let newMaze = this.state.maze;
      newMaze[coords[0]][coords[1]] = 'wall';
      this.setState({maze: newMaze});

    }

  }

  isValidPos(pos) {
    if (pos[0] < 0 || pos[1] < 0) {
      return false;
    }
    if (pos[0] > 19 || pos[1] > 19) {
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
      let newPos2 = [x, (y + delta)];
      if (this.isValidPos(newPos)) {
        children.push(newPos);
      }
      if (this.isValidPos(newPos2)) {
        children.push(newPos2);
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

  bfs(e) {
    e.preventDefault();
    if (!this.state.solving) {
      this.setState({solving: true});
      let queue = [[0, 0]];

      let solveInterval = setInterval(() => {
        if (this.unsolved && queue.length) {
          let parent = queue.shift();
          let newChildren = this.findChildren(parent);
          queue.push(...newChildren);
          this.checkPos(parent);
        } else {
          clearInterval(solveInterval);
          this.findShortestPath();
        }
      }, 30);
    }
  }


  // dfs(e, start = [0, 0]) {
  //   const that = this;
  //   if (that.dfsCheckPos(start)) {
  //     return true;
  //   }
  //   if (this.unsolved && this.state.unsolved) {
  //     let children = that.findChildren(start);
  //
  //     children.forEach(child => {
  //       let result = that.dfs(1,child);
  //       if (result) {
  //         that.traceDFS();
  //         return result;
  //       } else {
  //         return false;
  //       }
  //     });
  //
  //   }
  //   return false;
  // }

  solveDfs(e) {
    console.log('solvedfs');
    e.preventDefault();

    if (!this.state.solving) {
      this.setState({solving: true});
      // return () => {

        const dfsSolver = new Solver(this.state.maze);

        let result = dfsSolver.dfs();
        this.traceDFS(result.path, result.nodes.slice(-1)[0]);
      // };
    }
  }

  traceDFS(dfsPath, node) {

    let idx = 0;
    const that = this;
    let dfsInterval = setInterval(() => {
      if (idx < dfsPath.length) {
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

  dfsCheckPos(pos) {

    let posValue = this.state.maze[pos[0]][pos[1]];
    if (posValue === 'finish') {
      this.unsolved = false;
      this.setState({unsolved: false});
      return true;

    } else if (posValue !== 'start') {
      this.dfsPath.push(pos);
    }
    return false;

  }

  reset(e) {
    e.preventDefault();
    if (!this.state.solving) {
      this.unsolved = true;
      this.path = {};
      this.dfsPath = [];
      this.setState({maze: this.blankMaze(), unsolved: true});
    }
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
          <button className='button' onClick={this.bfs} >Solve BFS</button>
          <button className='button' onClick={this.solveDfs} >Solve DFS</button>
          <button className='button' onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Maze;
