import Tree from "./tree.js";
import Node from "./node.js";

export default class Team extends Tree {
	constructor(manager = null) {
		super();
		if (manager != null) {
			this.add(new Node(manager));
		}
	}

	getLeader() {
		return super.root();
	}

	getManager() {
		return super.root().data;
	}

	setManager(employee) {
		let employeeNode;
		if (employee instanceof Node) {
			employeeNode = employee;
		} else {
			employeeNode = new Node(employee);
		}
		
		// Do not set manager if the employee is not a manager
		if (employee.data.getRole().toLowerCase() !== "manager") {
			return;
		}

		if (this.isEmpty()) {
			this.add(employeeNode);
		} else {
			// TODO: Test if setting this to a new object overwrites the instance...
			let newTeam = new Team(employeeNode);
			newTeam.add(this.root());
			//this = newTeam;
			Object.assign(this, newTeam);
		}
	}

	addEmployee(employee) {
		let employeeNode;
		if (employee instanceof Node) {
			employeeNode = employee;
		} else {
			employeeNode = new Node(employee);
		}
		this.createCardHTML(employeeNode);
		
		return this.add(employeeNode);
	}
/*
	removeEmployee(employee) {
		let employeeNode;
		if (employee instanceof Node) {
			employeeNode = employee;
		} else {
			employeeNode = new Node(employee);
		}

		return this.remove(employeeNode);
	}
*/
	hasEmployee(employee) {
		let employeeNode;
		if (employee instanceof Node) {
			employeeNode = employee;
		} else {
			employeeNode = new Node(employee);
		}
		this.createCardHTML(employeeNode);
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

	getEmployeeByEmail(email) {
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
				employees.push(this.#getAllEmployees(employee));
			}
			return employees
		}
	}

	// Employee Node
	createCardHTML(employee) {
		if (!(employee instanceof Node)) {
			return;
		}

		// Create card text section
		let textProperties = Object.keys(employee.data).filter(element => element !== "name");
		let cardText = [];
		for (const property of textProperties) {
			cardText.push(`\t\t<span class="card-text ${property}">${employee.data[property]}</span>`);
		}
		let textSection = "<p>\n" + cardText.join("\n") + "\n\t</p>";

		// Create card links section
		let links = this.createCardLinks(employee);
		let cardLinks = links.join("\n\t");

		let html = `<div class="card ${employee.data.getRole().toLowerCase()}" style="width: 18rem;" id="${employee.data.id}">
	<div class="card-body">
		<h5 class="card-title name">${employee.data.getName()}</h5>
		<h6 class="card-subtitle mb-2 text-muted role">${employee.data.getRole()}</h6>
		${textSection}
		${cardLinks}
	</div>
</div>`;
		employee.data.html = html;
	}

	// Args are node.parent and node
	createCardLinks(employee) {
		if (!(employee instanceof Node)) {
			return;
		}

		let cardLinks = [];
		if (employee.parent.data != null) {
			cardLinks.push(`<a href="#${employee.parent.data.id}" class="card-link to-manager-link"}">Manager</a>`);
		}
		if (employee.data != null && employee.data.getRole().toLowerCase() === "manager") {
			cardLinks.push(`<a href="./${employee.data.id}.html" class="card-link to-team-link">View Team</a>`);
		}
		return cardLinks;
	}
}