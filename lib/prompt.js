import inquirer from "inquirer";

export default class Prompt {
    constructor(question) {
        this.questions = question.questions
        this.key = question.key;
    }

    async prompt() {
        return await this.#prompt()
            .catch((err) => console.log(err));
    }

    async #prompt() {
        const response = await inquirer.prompt(this.questions);
        return response;
    }
}

