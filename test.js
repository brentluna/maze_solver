import Node from './node.jsx';
import React from 'react';

class Solver extends React.Component {
  constructor() {
    this.maze = this.makeMaze();
    this.invalid = [];
    this.endPos = [9, 9];
    this.startPos = [0, 0];
  }



  handleClick(e) {
    e.preventDefault()
    // not quite sure how to go about this below
    // push coords prop into this.invalid and change color of the node
  }

  makeMaze() {
    mazeArr = []
    for (let i = 0; i < 10; i++) {
      mazeArr.push([]);
      for (let j = 0; j < 10; j++) {
        mazeArr.push(<Node coord={[i, j]} onClick={handleClick} />)
      }
    }
    return mazeArr;
  }

  validPos(pos) {
    //pos within grid size && !this.invalid.includes(pos)
  }

  findChildren(pos) {
    // return array of child nodes if they are validPos
  }

  changeNodeColor(pos) {
    //not sure how to update the nodes color
    // this.maze[parent[0]][parent[1]]
  }

  solve(e) {
    e.preventDefault();

    queue = [this.startPos];
    let unsolved = true;

      let interval = setInterval(() => {
        if (unsolved || queue.length) {
          let parent = queue.shift();
          this.changeNodeColor(parent);

          if (parent === this.endPos) {
            unsolved = false;
            interval.clearInteval();
          } else {
            queue.push(...this.findChildren(parent));
        }
      }, 100);
      //
    }
  }
  // solve(e) {
  //   e.preventDefault();
  //
  //   queue = [this.startPos];
  //   let unsolved = true;
  //
  //   while (unsolved || queue.length) {
  //     let interval = setInterval(() => {
  //       let parent = queue.shift();
  //       this.changeNodeColor(parent);
  //
  //       if (parent === this.endPos) {
  //         unsolved = false;
  //         interval.clearInteval();
  //       } else {
  //         queue.push(...this.findChildren(parent));
  //       }
  //     }, 100);
  //     //
  //   }
  // }



  render() {
    return (
      {this.makeMaze}
      <button onClick={this.solve} />
    )
  }
}
