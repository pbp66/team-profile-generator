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

    add(node = null) {
        if (node == null) {
            return false;
        }
        return this.#addNode(node);
    }

    remove(node = null) {
        if (node == null || this.isEmpty() || !this.contains(node)) {
            return false;
        } else if (node.data === this.root.data) {
            // TODO: Removing the parent node deletes the entire tree...
            // TODO: Define behavior to set new Root node
            node.parent = null;
            this.root = null;
            this.size = 0;
        } else {
            this.root = this.#removeNode(this.root, node);
            this.size--;
        }
        return true;
    }

    contains(node = null) {
        if (node == null) {
            return false;
        }
        return this.#containsNode(this.root, node);
    }

    size() {
        return this.size;
    }

    height() {
        return this.#height(this.root);
    }

    isEmpty() {
        return this.size() === 0;
    }

    #addNode(node) {
        if (this.root.data == null) {
            if (node.parent == null) {
                this.root = node; // Parent will remain null;
            } else {
                this.add(node.parent);
            }
            this.size++;
            return true;
        } else if (node.parent == null) {
            this.root.addChild(node);
            this.size++;
            return true;
        } else {
            return false;
        }
    }

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

    #height(node) {
        if (node == null || node.children.length === 0) {
            return 0;
        }
        let heights = [];
        for (let i = 0; i < node.children.length; i++) {
            heights.push(this.#height(node.children[i]));
        }
        return Math.max(heights) + 1;
    }
}