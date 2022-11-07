import Team from "./team.js";
import Employee from "./employee.js";
import Engineer from "./engineer.js";
import Intern from "./intern.js";
import Manager from "./manager.js";
import Prompts from "./prompts.js";
import Answer from "./answer.js";

export default class TeamBuilder {
	constructor() {
		this.team = new Team();
		this.teamMembers = new Map();
		this.teamRoles = [];
		this.managerRoles = [];

		this.prompts = undefined;
	}
	
	init(prompts, managerRoles = [], teamRoles = []) {
		this.prompts = prompts;
		if (managerRoles.length > 0) {
			for (const manager of managerRoles) {
				this.managerRoles.push(manager);
			}
		}
		if (teamRoles.length > 0) {
			for (const role of teamRoles) {
				this.teamRoles.push(role);
			}
		}
	}

	async start() {
		return await this.build("manager");
	}

	// TODO: Eliminate hard-coded keys for the prompts
	async build(promptKey) {
		let answer = undefined, newMember = undefined, endAnswer = undefined;
		let endKey = "finish";
		do {
			if (promptKey !== "finish") {
				answer = await this.prompts.prompt(promptKey);
				newMember = this.addTeamMember(answer.response.id, answer.response);
			}

			endAnswer = await this.prompts.prompt(endKey);
			endKey = endAnswer.response.toLowercase();

			if (endKey === "manager") {
				let newTeamBuilder = new TeamBuilder();
				newTeamBuilder.init(this.prompts, this.managerRoles, this.teamRoles);
				let newTeam = newTeamBuilder.start();
				this.team.addEmployee(newTeam.getLeader());
			}

			promptKey = endKey;
		} while (endKey !== "finish");

		return this.team;
	}

	addTeamMember(key, value) {
		let role = Object.keys(value)[0];
		let employee = {"key": key, "employee": undefined};
		switch (role) {
			case "manager":
				employee.employee = new Manager(value.name, value.id, value.email, value.officeNumber);
				break;
			case "engineer":
				employee.employee = new Engineer(value.name, value.id, value.email, value.github);
				break;
			case "intern":
				employee.employee = new Intern(value.name, value.id, value.email, value.school);
				break;
			default:
		}
		this.teamMembers.set(employee.key, employee.employee);

		if (!(this.teamRoles.includes(employee.employee.getRole()))) {
			this.teamRoles.push(employee.employee.getRole());
		}
		this.team.addEmployee(employee.employee);
		return employee.employee;
	}
	
	removeTeamMember(key) {
		// TODO: Handle invalid key
		this.teamMembers.delete(key);
	}
	
	getTeamMember(key) {
		return this.teamMembers.get(key);
	}
	
	addTeamRole(role) {
		this.teamRoles.push(role.toLowercase());
	}
	
	removeTeamRole(role) {
		
	}

	addManagerRole(role) {
		this.managerRoles.push(role.toLowercase());
		this.teamRoles.push(role.toLowercase());
	}

	removeManagerRole(role) {

	}

	getTeam() {
		return this.team;
	}
}