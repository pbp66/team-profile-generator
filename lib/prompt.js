import inquirer from "inquirer";

export default class Prompt {
    constructor(question) {
        this.questions = question.questions;
        this.key = question.key;
        this.prompt = inquirer.createPromptModule();
    }

    async ask() {
        return await this.#prompt()
            .catch((err) => console.log(err));
    }

    async #prompt() {
        //const p = inquirer.createPromptModule();
        const response = await this.prompt(this.questions);
        //const response = await inquirer.prompt(this.questions);
        return response;
    }
}

