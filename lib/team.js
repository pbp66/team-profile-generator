import Tree from "./tree.js";
import Node from "./node.js";

export default class Team extends Tree {
	constructor(manager = null) {
		super();
		if (manager != null) {
			this.add(new Node(manager));
		}
	}

	getManager() {
		return this.root().data;
	}

	setManager(employee) {
		let employeeNode = new Node(employee);
		if (this.isEmpty()) {
			this.add(employeeNode);
		} else {
			// TODO: Test if setting this to a new object overwrites the instance...
			let newTeam = new Team(employeeNode);
			newTeam.add(this.root());
			this = newTeam;
		}
	}

	addEmployee(employee) {
		let employeeNode = new Node(employee);
		return this.add(employeeNode);
	}

	removeEmployee(employee) {
		let employeeNode = new Node(employee);
		return this.remove(employeeNode);
	}

	hasEmployee(employee) {
		let employeeNode = new Node(employee);
		return this.contains(employeeNode);
	}

	employeeCount() {
		return this.size();
	}

	// TODO: Decide if this needs to return a Node or Employee object. Currently returns employee object
	getAllEmployees() {
		let employees = [this.getManager()];
		if (this.root().children.length > 0) {
			employees.push(this.#getAllEmployees(this.root()));
		}
		return employees;
	}

	getEmployeesByName(name) {
		let employees = this.getAllEmployees();
		return employees.filter(element => element.name === name);
	}

	getEmployeesByEmail(email) {
		let employees = this.getAllEmployees();
		return employees.filter(element => element.email === email);
	}

	// TODO: Expects all employees to have unique ID's. Validation function in constructor or addEmployee() method?
	getEmployeeById(id) {
		let employees = this.getAllEmployees();
		return employees.filter(element => element.id === id)[0];
	}

	// TODO: Decide if this needs to return a Node or Employee object
	#getAllEmployees(employee) {
		if (employee == null) {
			return;
		} else if (employee.children.length === 0) {
			return employee.data;
		} else {
			let employees = [];
			for (let i = 0; i < employee.children.length; i++) {
				return employees.push(this.#getAllEmployees(employee));
			}
		}
	}
}