import Prompt from "./prompt.js";
import Answer from "./answer.js";

export default class Prompts {
    constructor(...questions) {
        this.keys = [];
        this.questions = questions;
        this.prompts = new Map();
        this.#generatePrompts();
    }

    getPrompt(key) {
        return this.prompts.get(key);
    }

    getAll() {
        let promptList = [];
        for(prompt in this.prompts.entries()) {
            promptList.push(prompt);
        }
        return promptList;
    }

    prompt(key) {
        let response = this.getPrompt(key).prompt();
        return new Answer(key, response);
    }

    promptAll() {

    }

    #generatePrompts() {
        this.questions.forEach(element => {
            this.prompts.set(element.key.toLowercase(), new Prompt(element));
            this.keys.push(element.key.toLowercase());
        });
    }
}