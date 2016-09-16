
class PolyTreeNode {
  constructor(value) {
    this.value = value;
    this.pos = null;
    this.parent = null;
    this.children = [];
  }

  children() {
    return [...this.children];
  }

  setParent(parent) {
    if (this.parent === parent) {
      return;
    }

    if (this.parent) {
      let idx = this.parent.children.indexOf(this);
      this.parent.children.splice(idx, 1);
    }

    this.parent = parent;
    if (this.parent) {
      this.parent.children.push(this);
    }
  }

  addChild(child) {
    child.setParent = this;
  }

  removeChild(child) {
    if (child && !this.children.includes(child)) {
      return;
    }
    child.parent = null;
  }

  _children() {
    return this.children;
  }
}

class Solver {
  constructor(maze) {
    this.maze = maze;
    this.path = [];
  }

  isValidPos(pos) {
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

        node.addChild(new PolyTreeNode('child', newPos));
      }
      if (this.isValidPos(newPos2)) {
        node.adChild(new PolyTreeNode('child', newPos2));

      }
    });

  }

  defs


}
