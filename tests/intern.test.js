import Intern from "../lib/intern.js";

describe("Intern", () => {
    it("Returns an Intern object with name, id, email, and github properties", () => {
        const employee = new Intern();

        expect("name" in employee).toEqual(true);
        expect("id" in employee).toEqual(true);
        expect("email" in employee).toEqual(true);
        expect("school" in employee).toEqual(true);
    });

    it("Returns an Intern object with appropriate name, id, and email values when instantiated", ()=> {
        const employee = new Intern("John Test", 1234, "john.test@test.com", "University of Wisconsin");
        
        expect(employee.name === "John Test").toEqual(true);
        expect(employee.id === 1234).toEqual(true);
        expect(employee.email === "john.test@test.com").toEqual(true);
        expect(employee.school === "University of Wisconsin");
    });

    it("Returns name when the getName() method is called", () => {
        const employee = new Intern("John Test", 1234, "john.test@test.com", "University of Wisconsin");

        expect(employee.getName() === "John Test").toEqual(true);
    });

    it("Returns id when the getId() method is called", () => {
        const employee = new Intern("John Test", 1234, "john.test@test.com", "University of Wisconsin");

        expect(employee.getId() === 1234).toEqual(true);
    });

    it("Returns email when the getEmail() method is called", () => {
        const employee = new Intern("John Test", 1234, "john.test@test.com", "University of Wisconsin");

        expect(employee.getEmail() === "john.test@test.com").toEqual(true);
    });

    it("Returns github when the getSchool() method is called", () => {
        const employee = new Intern("John Test", 1234, "john.test@test.com", "University of Wisconsin");

        expect(employee.getSchool() === "University of Wisconsin").toEqual(true);
    });

    it("Returns role when the getRole() method is called", () => {
        const employee = new Intern("John Test", 1234, "john.test@test.com", "University of Wisconsin");

        expect(employee.getRole() === "Intern").toEqual(true);
    });
});