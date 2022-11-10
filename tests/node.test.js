import Node from "../lib/team/node.js";

describe("Node", () => {

    it("Returns a Node object with data, degree, parent, children, and siblings", () => {
        const node = new Node(1);

        expect("data" in node).toEqual(true);
        expect("degree" in node).toEqual(true);
        expect("parent" in node).toEqual(true);
        expect("children" in node).toEqual(true);
        expect("siblings" in node).toEqual(true);
    });

    it("Returns a Node object with appropriate data, degree, parent, children, and siblings values when instantiated.", () => {
        const node = new Node(1);

        expect(node.data === 1).toEqual(true);
        expect(node.degree === 0).toEqual(true);
        expect(node.parent === null).toEqual(true);
        expect(node.children.length === 0).toEqual(true);
        expect(node.siblings.length === 0).toEqual(true);
    });

    it("Returns the data property with the getData() method", () => {
        const node = new Node(1);

        expect(node.getData() === 1).toEqual(true);
    });

    it("Sets the data property with the setData(data) method", () => {
        const node = new Node(1);
        node.setData(5)
        expect(node.getData() === 5).toEqual(true);
        node.setData(1);
    });



    it("Returns the parent property with the getParent() method", () => {
        const node = new Node(1);
        const parentNode = new Node(0);

        parentNode.addChild(node);

        expect(node.getParent() === parentNode).toEqual(true);
    });


    it("Sets the parent property with the setParent(node) method", () => {
        const node = new Node(1);
        const parentNode = new Node(0);
        const parentNode2 = new Node(25);
        parentNode.addChild(node);

        node.setParent(parentNode2);

        expect(node.getParent() === parentNode2).toEqual(true);
    });

    describe("addChild(node)", () => {
        const node = new Node(1);
        const parentNode = new Node(0);
        const node2 = new Node(2);
        const node3 = new Node(3);
        const node4 = new Node(4);
        
        parentNode.addChild(node);
        parentNode.addChild(node2);
        parentNode.addChild(node3);
        parentNode.addChild(node4);

        it("Sets the child node's parent to the current node instance", () => {
            expect(parentNode.children.length > 0).toEqual(true);
            expect(parentNode.children[0] === node).toEqual(true);
            expect(node.parent === parentNode).toEqual(true);
        });

        it("Increases the child node's degree by 1 compared to the parent", () => {
            expect(node.degree === 1).toEqual(true);
        });

        it("Adds all current child nodes to the child node's siblings array", () => {
            expect(node.siblings.length === 3).toEqual(true);
            for (let i = 0; i < node.siblings.length; i++) {
                expect([node2, node3, node4].includes(node.siblings[i])).toEqual(true);
            }
        });

        it("Add the child node to the current node's children array property", () => {
            expect(node2.siblings.length === 3).toEqual(true);
            expect(node3.siblings.length === 3).toEqual(true);
            expect(node4.siblings.length === 3).toEqual(true);

            // TODO: Check if each of the siblings in the siblings array contain each other. 

        });

    });

    describe("addChildren(nodes)", () => {
        it("Adds multiple child nodes to the current node object", () => {

        });
    });
/*
    describe("removeChild(node)", () => {
        it("Removes the child node from the parent's node children array property", () => {

        });

        it("Removes the child node from all of the other children's siblings array", () => {

        })

        it("Sets the removed child node's properties to null", () => {

        });
    });
*/
    describe("isEqualTo(node)", () => {
        it("Returns true when the values of both nodes are strictly equal", () => {

        });

        it("Returns false when at least one of the values of both nodes are not strictly equal", () => {

        })
    });
/*
    describe("delete()", () => {
        it("Sets all of a Node's properties to null", () => {

        });
    });
*/
});