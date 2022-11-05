import inquirer from "inquirer";
import Answer from "./answer.js";
import Team from "./team.js";

class TeamBuilder {
	constructor(manager) {
		this.team = new Team(manager);
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
}