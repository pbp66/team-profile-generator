import inquirer from "inquirer";
import Employee from "./employee.js";
import Engineer from "./engineer.js";
import Intern from "./intern.js";
import Manager from "./manager.js";
import TeamBuilder from "./teambuilder.js";

export default class Prompts {
    constructor(...questions) {
        this.prompts = new Map();
        this.questions = questions;
        // TODO: Implement method to generate prompt modules from each passed questions object
        // TODO: Add method to attach callback functions depending on the active prompt
        this.#generatePrompts();
        inquirer.createPromptModule();
    }

    next() {

    }

    async prompt(key) {
        this.questions = questions;
        await this.prompt(questions);
        return;
    }

    #generatePrompts() {
        for (let i = 0; i < this.questions.length; i++) {
            this.prompts.set(/* TODO: What information do I want to save? */)
        }
    }
}