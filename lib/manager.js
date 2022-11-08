import Employee from "./employee.js"

export default class Manager extends Employee {
    // TODO: Provide validation for inputs
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
        this.createCardHTML();
    }

    getOfficeNumber() {
        return this.officeNumber;
    }

    getRole() {
        return "Manager";
    }
}