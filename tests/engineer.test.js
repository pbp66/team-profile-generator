import Engineer from "../lib/employee/engineer.js";

describe("Engineer", () => {
    it("Returns an Engineer object with name, id, email, and github properties", () => {
        const employee = new Engineer();

        expect("name" in employee).toEqual(true);
        expect("id" in employee).toEqual(true);
        expect("email" in employee).toEqual(true);
        expect("github" in employee).toEqual(true);
    });

    it("Returns an Engineer object with appropriate name, id, and email values when instantiated", ()=> {
        const employee = new Engineer("John Test", 1234, "john.test@test.com", "pbp66");
        
        expect(employee.name === "John Test").toEqual(true);
        expect(employee.id === 1234).toEqual(true);
        expect(employee.email === "john.test@test.com").toEqual(true);
        expect(employee.github === "pbp66");
    });

    it("Returns name when the getName() method is called", () => {
        const employee = new Engineer("John Test", 1234, "john.test@test.com", "pbp66");

        expect(employee.getName() === "John Test").toEqual(true);
    });

    it("Returns id when the getId() method is called", () => {
        const employee = new Engineer("John Test", 1234, "john.test@test.com", "pbp66");

        expect(employee.getId() === 1234).toEqual(true);
    });

    it("Returns email when the getEmail() method is called", () => {
        const employee = new Engineer("John Test", 1234, "john.test@test.com", "pbp66");

        expect(employee.getEmail() === "john.test@test.com").toEqual(true);
    });

    it("Returns github when the getGithub() method is called", () => {
        const employee = new Engineer("John Test", 1234, "john.test@test.com", "pbp66");

        expect(employee.getGithub() === "pbp66").toEqual(true);
    });

    it("Returns role when the getRole() method is called", () => {
        const employee = new Engineer("John Test", 1234, "john.test@test.com", "pbp66");

        expect(employee.getRole() === "Engineer").toEqual(true);
    });
});