import PolyTreeNode from './poly_tree_node';


class Solver {
  constructor(maze) {
    this.maze = maze;
    this.path = [];
    this.nodes = [];
  }

  isValidPos(pos) {
    for (let i = 0; i < this.path.length; i++) {
      let el = this.path[i];
      if (el[0] === pos[0] && el[1] === pos[1]) {
        return false;
      }
    }
    if (pos[0] < 0 || pos[1] < 0) {
      return false;
    }
    if (pos[0] > 19 || pos[1] > 19) {
      return false;
    }
    let inValidTypes = ['wall', 'checking', 'start'];
    let posValue = this.maze[pos[0]][pos[1]];
    if (inValidTypes.includes(posValue)) {
      return false;
    }
    return true;
  }

  findChildren(node) {
    let deltas = [-1, 1];
    let x = node.pos[0];
    let y = node.pos[1];
    deltas.forEach(delta => {
      let newPos = [(x + delta), y];
      let newPos2 = [x, (y + delta)];

      if (this.isValidPos(newPos)) {

        let newVal1 = this.newValue(newPos);
        let child1 = new PolyTreeNode(newVal1, newPos);
        node.addChild(child1);
      }
      if (this.isValidPos(newPos2)) {
        let newVal2 = this.newValue(newPos2);
        let child2 = new PolyTreeNode(newVal2, newPos2);
        node.addChild(child2);

      }
    });
  }

    newValue(pos) {

      if (this.maze[pos[0]][pos[1]] === 'finish') {
        return 'finish';
      } else {
        return 'child';
      }
    }

    dfs(node = new PolyTreeNode('start', [0, 0])) {
      this.path.push(node.pos);
      this.nodes.push(node);
      const that = this;
      if (node.value ==='finish') {

        return {path: this.path, nodes: this.nodes};

      }
      this.findChildren(node);

      for (let i = 0; i < node.children.length; i++) {
        let child = node.children[i];
        let result = this.dfs(child);
        if (result) {

          return {path: this.path, nodes: this.nodes};
        }
      }

      return null;
    }

    bfs(node = new PolyTreeNode('start', [0, 0])) {

      let queue = [node];
      let unsolved = true;
      while (unsolved && queue.length) {
        let parent = queue.shift();
        console.log(parent.pos);
        this.path.push(parent.pos);
        this.nodes.push(parent);
        if (parent.value === 'finish') {
          unsolved = false;
          return {path: this.path, nodes: this.nodes};
        }
        this.findChildren(parent);
        let childPos = parent.children.map(child => {
          return child.pos;
        });
        this.path.push(...childPos);

        queue.push(...parent.children);
      }
      return null;
    }


  }

  export default Solver;
