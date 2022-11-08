import Employee from "../lib/employee";

describe("Employee", () => {
    it("Returns an object with name, id, and email properties", () => {
        const employee = new Employee();

        expect("name" in employee).toEqual(true);
        expect("id" in employee).toEqual(true);
        expect("email" in employee).toEqual(true);
    });

    it("Returns name when the getName() method is called", () => {
        const employee = new Employee("John Test", 1234, "john.test@test.com");

        
    })
});