class PolyTreeNode {
  constructor(value, pos) {
    this.value = value;
    this.pos = pos;
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

    child.setParent(this);
  }

  removeChild(child) {
    if (child && !this.children.includes(child)) {
      return;
    }
    child.parent = null;
  }


}

export default PolyTreeNode;
