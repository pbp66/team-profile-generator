export default class Node {
    constructor(data) {
        if (data != null) {
            this.data = data;
            this.degree = 0;
            this.parent = null;
            this.children = [];
            this.siblings = [];

            this.#properties = Object.keys(data);
        } else {
            // Do nothing?
        }
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

    // TODO: Update siblings array
    addChild(node) {
        node.parent = this;
        this.children.push(node);
    }

    // TODO: Update siblings array
    addChildren(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            this.children.push(nodes[i]);
            this.siblings++;
        }
    }

    removeChild(node) {
        let nodeIndex = 0;
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i] === node) {
                nodeIndex = i;
                break;
            }
        }
        let splicedNode = this.children.splice(nodeIndex, 1);
        splicedNode.delete();
        this.siblings--;
    }

    isEqualTo(node) {
        const nodeKeys = Object.keys(node);
        if (this.#properties.length === nodeKeys.length) {
            for (let i = 0; i < nodeKeys.length; i++) {
                if (node[nodeKeys[i]] !== this.data[nodeKeys[i]]) {
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