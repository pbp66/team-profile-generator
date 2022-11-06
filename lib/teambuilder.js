import Team from "./team.js";
import Employee from "./employee.js";
import Engineer from "./engineer.js";
import Intern from "./intern.js";
import Manager from "./manager.js";

export default class TeamBuilder {
	constructor() {
		this.team = new Team();
		this.teamMembers = new Map();
		this.teamRoles = [];
	}
	
	addTeamMember(key, value) {
		this.teamMembers.set(key, value);
		// TODO: check if value has a role attribute. If so, add it if it is not present in this.teamRoles;
	}
	
	removeTeamMember(key) {
		// TODO: Handle invalid key
		this.teamMembers.delete(key);
	}
	
	getTeamMember(key) {
		return this.teamMembers.get(key);
	}
	
	addTeamRole(role) {
		this.teamRoles.push(role);
	}
	
	removeTeamRole(role) {
		
	}

	createTeam() {
		
	}

	getTeam() {
		
	}
}