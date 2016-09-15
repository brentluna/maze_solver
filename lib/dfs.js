
class PolyTreeNode {
  constructor(value) {
    this.value = value;
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
      let idx = this.parent._children.indexOf(this);
      this.parent._children.splice(idx, 1);
    }

    this.parent = parent;
    if (this.parent) {
      this.parent._children.push(this);
    }
  }

  addChild(child) {
    child.parent = this;
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
