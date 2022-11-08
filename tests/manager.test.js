import Manager from "../lib/manager.js";

describe("Manager", () => {
    it("Returns an Manager object with name, id, email, and github properties", () => {
        const employee = new Manager();

        expect("name" in employee).toEqual(true);
        expect("id" in employee).toEqual(true);
        expect("email" in employee).toEqual(true);
        expect("officeNumber" in employee).toEqual(true);
    });

    it("Returns an Manager object with appropriate name, id, and email values when instantiated", ()=> {
        const employee = new Manager("John Test", 1234, "john.test@test.com", 9087);
        
        expect(employee.name === "John Test").toEqual(true);
        expect(employee.id === 1234).toEqual(true);
        expect(employee.email === "john.test@test.com").toEqual(true);
        expect(employee.school === "pbp66");
    });

    it("Returns name when the getName() method is called", () => {
        const employee = new Manager("John Test", 1234, "john.test@test.com", 9087);

        expect(employee.getName() === "John Test").toEqual(true);
    });

    it("Returns id when the getId() method is called", () => {
        const employee = new Manager("John Test", 1234, "john.test@test.com", 9087);

        expect(employee.getId() === 1234).toEqual(true);
    });

    it("Returns email when the getEmail() method is called", () => {
        const employee = new Manager("John Test", 1234, "john.test@test.com", 9087);

        expect(employee.getEmail() === "john.test@test.com").toEqual(true);
    });

    it("Returns github when the getOfficeNumber() method is called", () => {
        const employee = new Manager("John Test", 1234, "john.test@test.com", 9087);

        expect(employee.getOfficeNumber() === 9087).toEqual(true);
    });

    it("Returns role when the getRole() method is called", () => {
        const employee = new Manager("John Test", 1234, "john.test@test.com", 9087);

        expect(employee.getRole() === "Manager").toEqual(true);
    });
});