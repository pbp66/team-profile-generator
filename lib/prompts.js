import inquirer from "inquirer";

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