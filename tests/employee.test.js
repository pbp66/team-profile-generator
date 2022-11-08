import Employee from "../lib/employee.js";

describe("Employee", () => {
    it("Returns an Employee object with name, id, and email properties", () => {
        const employee = new Employee();

        expect("name" in employee).toEqual(true);
        expect("id" in employee).toEqual(true);
        expect("email" in employee).toEqual(true);
    });

    it("Returns an Employee object with appropriate name, id, and email values when instantiated", ()=> {
        const employee = new Employee("John Test", 1234, "john.test@test.com");
        
        expect(employee.name === "John Test").toEqual(true);
        expect(employee.id === 1234).toEqual(true);
        expect(employee.email === "john.test@test.com").toEqual(true);
    });

    it("Returns name when the getName() method is called", () => {
        const employee = new Employee("John Test", 1234, "john.test@test.com");

        expect(employee.getName() === "John Test").toEqual(true);
    });

    it("Returns id when the getId() method is called", () => {
        const employee = new Employee("John Test", 1234, "john.test@test.com");

        expect(employee.getId() === 1234).toEqual(true);
    });

    it("Returns email when the getEmail() method is called", () => {
        const employee = new Employee("John Test", 1234, "john.test@test.com");

        expect(employee.getEmail() === "john.test@test.com").toEqual(true);
    });

    it("Returns role when the getRole() method is called", () => {
        const employee = new Employee("John Test", 1234, "john.test@test.com");

        expect(employee.getRole() === "Employee").toEqual(true);
    });
});