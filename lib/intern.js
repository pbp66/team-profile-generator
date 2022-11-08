import Employee from "./employee.js"

export default class Intern extends Employee {
    // TODO: Provide validation for inputs
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
        this.createCardHTML();
    }

    getSchool() {
        return this.school;
    }

    getRole() {
        return "Intern";
    }
}