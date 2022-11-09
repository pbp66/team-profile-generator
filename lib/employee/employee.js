export default class Employee {
    // TODO: Provide validation for inputs
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.html;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }
}