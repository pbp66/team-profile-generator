import inquirer from "inquirer";

export default class Prompts {
    constructor(...questions) {
        this.prompts = [];
        this.questions = questions;

        // TODO: Implement method to generate prompt modules from each passed questions object
        // TODO: Add method to attach callback functions depending on the active prompt
        inquirer.createPromptModule();
    }

    async prompt(questions) {
        this.questions = questions;
        return await this.prompt(questions);
    }
}