import inquirer from "inquirer";

export default class Prompt {
    constructor(question) {
        this.question = question
        this.key = this.question.name;
        this.prompt = inquirer.createPromptModule();
    }

    async prompt() {
        return this.#prompt()
            .catch((err) => console.log(err));
    }

    async #prompt() {
        return await this.prompt(this.question);
    }
}

