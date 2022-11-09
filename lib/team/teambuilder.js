import Team from "./team.js";
import Engineer from "./employee/engineer.js";
import Intern from "./employee/intern.js";
import Manager from "./employee/manager.js";

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
		let endKey;
		do {
			endKey = "finish";
			if (promptKey !== "finish") {
				answer = await this.prompts.prompt(promptKey);
				newMember = this.addTeamMember(answer.response.id, answer.response);
			}

			endAnswer = await this.prompts.prompt(endKey);
			endKey = (Object.values(endAnswer.response)[0]).toLowerCase();
			if (endKey === "manager") {
				let newTeamBuilder = new TeamBuilder();
				newTeamBuilder.init(this.prompts, ["manager"], ["engineer", "intern"]);
				let newTeam = await newTeamBuilder.start();
				this.team.addEmployee(newTeam.getLeader());
				promptKey = "finish";
				console.log(`\nFor ${newMember.name}'s team:\n`);
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
				employee.employee = new Manager(value[role], value.id, value.email, value.officeNumber);
				break;
			case "engineer":
				employee.employee = new Engineer(value[role], value.id, value.email, value.github);
				break;
			case "intern":
				employee.employee = new Intern(value[role], value.id, value.email, value.school);
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
/*	
	removeTeamMember(key) {
		// TODO: Handle invalid key
		this.teamMembers.delete(key);
	}
*/	
	getTeamMember(key) {
		return this.teamMembers.get(key);
	}
	
	addTeamRole(role) {
		this.teamRoles.push(role.toLowerCase());
	}
/*	
	removeTeamRole(role) {
		
	}
*/
	addManagerRole(role) {
		this.managerRoles.push(role.toLowerCase());
		this.teamRoles.push(role.toLowerCase());
	}
/*
	removeManagerRole(role) {

	}
*/
	getTeam() {
		return this.team;
	}
}