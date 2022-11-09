import Tree from "./tree.js";
import Node from "./node.js";
import { JSDOM } from "jsdom";

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
		let newEmployee = this.add(employeeNode);
		this.createCardHTML(employeeNode);

		return newEmployee;
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
		const dom = new JSDOM();
		let document = dom.window.document;

		// Card HTML Container
		let card = document.createElement("div");
		card.classList.add("card", employee.data.getRole().toLowerCase());
		card.style.width = "18rem";
		card.id = employee.data.id;

		// Card Body Container
		let cardBody = document.createElement("div");
		cardBody.classList.add("card-body");

		// Card Title
		let cardTitle = document.createElement("h5");
		cardTitle.classList.add("card-title", "name");
		cardTitle.innerHTML = employee.data.getName();
		cardBody.appendChild(cardTitle);

		// Card Subtitle
		let cardSubtitle = document.createElement("h6");
		cardSubtitle.classList.add("card-subtitle", "mb-2", "text-muted", "role");
		cardSubtitle.innerHTML = employee.data.getRole();
		cardBody.appendChild(cardSubtitle);

		// Create card text section
		let cardText = document.createElement("p");
		cardText.classList.add("card-text");

		let textProperties = Object.keys(employee.data).filter(element => element !== "name");
		for (const property of textProperties) {
			let span = document.createElement("span");
			span.classList.add("card-text", property);
			span.innerHTML = `${property}: ${employee.data[property]}`;
			cardText.appendChild(span);
		}
		cardBody.appendChild(cardText);

		// Create card links 
		if (employee.parent != null && employee.parent.data != null) {
			let managerLink = document.createElement("a");
			managerLink.href = `#${employee.parent.data.id}`;
			managerLink.classList.add("card-link", "to-manager-link");
			managerLink.innerHTML = "Manager";
			cardBody.appendChild(managerLink);
		}
		if (employee.data != null && employee.data.getRole().toLowerCase() === "manager") {
			let teamLink = document.createElement("a");
			teamLink.href = `./${employee.data.id}.html`;
			teamLink.classList.add("card-link", "to-team-link");
			teamLink.innerHTML = "View Team";
			cardBody.appendChild(teamLink);
		}

		card.appendChild(cardBody);
		employee.data.html = card;
	}
}