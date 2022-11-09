import Node from "./node.js";

export default class Tree {
    constructor() {
        this.root = new Node(null);
        this.depth = 0;
        this.size = 0;
    }

    root() {
        return this.root;
    }

    add(node) {
        if (node == null || node.data == null) {
            return false;
        }
        this.#addNode(node);
        return true;
    }
/*
    remove(node) {
        if (node == null || this.isEmpty() || !this.contains(node) || node.data == null) {
            return false;
        } else if (node.data === this.root.data) {
            // TODO: Removing the parent node deletes the entire tree...
            // TODO: Define behavior to set new Root node
            node.parent = null;
            this.root = null;
            this.size = 0;
        } else {
            this.root = this.#removeNode(this.root, node);

        }
        return true;
    }
*/
    contains(node) {
        if (node == null || node.data == null) {
            return false;
        }
        return this.#containsNode(this.root, node);
    }

    size() {
        return this.#size(this.root);
    }

    height() {
        return this.#height(this.root);
    }

    isEmpty() {
        if (this.root.data === null ) {
            return true;
        } else {
            return false;
        }
    }

    #addNode(node) {
        if (this.root.data == null) {
            if (node.parent == null) {
                this.root = node; // Parent will remain null;
            } else {
                this.add(node.parent);
            }
        } else if (node.parent == null) {
            this.root.addChild(node);
        } else {
            this.add(node.parent);
        }
    }
/*
    #removeNode(root, node) {
        if (!node.isEqualTo(root)) {
            for (let i = 0; i < root.children.length; i++) {
                return this.#removeNode(root.children[i], node);
            }
        } else {
            root.removeChild(node);
            root.addChildren(node.children);
            node.delete();
            return root;
        }
    }
*/
    #containsNode(root, node) {
        if (node.isEqualTo(root)) {
            return true;
        } else if (root.children.length === 0) {
            return false;
        } else {
            for (let i = 0; i < root.children.length; i++) {
                if (this.#containsNode(root.children[i], node)) {
                    return true;
                }
            }
        }
        return false;
    }

    #size(node) {
        if (node == null || node.data == null) {
            return 0;
        } else if (node.children.length === 0) {
            return 1;
        }
        let sizes = [];
        for (let i = 0; i < node.children.length; i++) {
            sizes.push(this.#size(node.children[i]));
        }
        return Math.sum(sizes) + 1;
    }

    #height(node) {
        if (node == null || node.data == null) {
            return 0;
        } else if (node.children.length === 0) {
            return 1;
        }
        let heights = [];
        for (let i = 0; i < node.children.length; i++) {
            heights.push(this.#height(node.children[i]));
        }
        return Math.max(heights) + 1;
    }
}