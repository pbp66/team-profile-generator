export default class Node {
    constructor(data) {
        this.data = data;
        this.degree = 0;
        this.parent = null;
        this.children = [];
        this.siblings = [];
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    setParent(node) {
        this.parent = node;
    }

    getParent() {
        return this.parent;
    }

    addChild(node) {
        node.parent = this;
        node.degree = this.degree++;
        node.siblings = [...this.children];
        for (let i = 0; i < node.siblings.length; i++) {
            node.siblings[i].siblings.push(node);
        }
        this.children.push(node);
    }

    addChildren(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            this.addChild(nodes[i]);
        }
    }

    removeChild(node) {
        let splicedNode;
        // Remove node from parent's children
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] === node) {
                splicedNode = this.children.splice(i, 1);
            }
            // Remove node from all adjacent child nodes
            for (let j = 0; j < this.children[i].siblings.length; j++) {
                if (this.children[i].siblings[j] === node) {
                    this.children[i].siblings.splice(j, 1);
                    break;
                }
            }
        }
        // Add children of node to parent node;
        splicedNode.addChildren(node.children);
        splicedNode.delete();
    }

    isEqualTo(node) {
        const nodeDataKeys = Object.keys(node.data);
        const thisDataKeys = Object.keys(this.data);
        if (thisDataKeys.length === nodeDataKeys.length) {
            for (let i = 0; i < nodeKeys.length; i++) {
                if (node.data[nodeDataKeys[i]] !== this.data[nodeDataKeys[i]]) {
                    return false;
                }
            }
        } else {
            return false;
        }
        return true;
    }

    delete() {
        const keys = Object.keys(this);
        for (let i = 0; i < keys.length; i++) {
            this[keys[i]] = null;
        }
    }
}