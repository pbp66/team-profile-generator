import Node from "../lib/node.js";

describe("Node", () => {
    it("Returns a Node object with data, degree, parent, children, and siblings", () => {

    });

    it("Returns a Node object with appropriate data, degree, parent, children, and siblings values when instantiated.", () => {

    });

    it("Returns the data property with the getData() method", () => {

    });

    it("Sets the data property with the setData(data) method", () => {

    });

    it("Returns the parent property with the getParent() method", () => {

    });

    it("Sets the parent property with the setParent(node) method", () => {

    });

    describe("addChild(node)", () => {
        it("Sets the child node's parent to the current node instance", () => {

        });

        it("Increases the child node's degree by 1 compared to the parent", () => {

        });

        it("Adds all current child nodes to the child node's siblings array", () => {

        });

        it("Add the child node to the current node's children array property", () => {

        });

    });

    describe("addChildren(nodes)", () => {
        it("Adds multiple child nodes to the current node object", () => {

        });
    });

    describe("removeChild(node)", () => {
        it("Removes the child node from the parent's node children array property", () => {

        });

        it("Removes the child node from all of the other children's siblings array", () => {
            
        })

        it("Sets the removed child node's properties to null", () => {

        });
    });

    describe("isEqualTo(node)", () => {
        it("Returns true when the values of both nodes are strictly equal", () => {

        });

        it("Returns false when at least one of the values of both nodes are not strictly equal", () => {

        })
    });

    describe("delete()", () => {
        it("Sets all of a Node's properties to null", () => {

        });
    });

});