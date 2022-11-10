import Tree from "../lib/team/tree.js";

describe("Tree", () => {
    it("Returns a Tree object with root, depth, and size", () => {

    });

    it("Returns a Tree object with appropriate root, depth, and size values when instantiated.", () => {

    });

    describe("root()", () => {
        it("Returns the root node of the tree object", () => {

        });
    });

    describe("add(node)", () => {
        it("Returns false if the node to add has a value of null", () => {

        });

        it("Returns false if the node to add has contains a data value of null (null data)", () => {

        });

        it("Sets the root node of tree as node if the root node does not exist and node does not have a parent node", () => {

        });

        it("Recursively sets the parent node of the passed node as the root of the tree if the root node does not exist", () => {

        });

        it ("Adds the node as a child of the root node", () => {

        });

        it("Recursively sets the parent node of the passed node as a child of the root node", () => {

        });
    });
/*
    describe("remove(node)", () => {

    });
*/
    describe("contains(node)", () => {
        it("Returns true if the node is contained within the tree", () => {

        })

        it("Returns false if the node is not contained within the tree", () => {

        });
    });

    describe("size()", () => {
        it("Returns the total number of nodes in the tree", () => {

        });
    });

    describe("height()", () => {
        it("Returns the total height of the tree", () => {

        });
    });

    describe("isEmpty()", () => {
        it("Returns true if the tree contains zero nodes", () => {

        });

        it("Returns false if the tree contains at least one node", () => {

        });
    });
});