import Prompt from "./prompt.js";

export default class Prompts {
    // Private properties
    #startKey;
    #endKey;

    constructor(...questions) {
        this.keys = [];
        this.answers = [];
        this.questions = questions;
        this.prompts = new Map();
        this.#generatePrompts();
    }

    async start() {
        return await this.next(this.#startKey);
    }

    async next(key) {
        let response = await this.prompts.get(key).prompt();
        this.answers.push(response);
        return await this.end();
    }

    // TODO: Convert to a class to create a predictable "final" question.
    async end() {
        let response = await this.prompts.get(this.#endKey).prompt();
        const value = Object.values(response)[0].toLowerCase();
        if (value === this.#endKey) {
            return this.answers;
        } else {
            return await this.next(value);
        }
    }

    setStartingPrompt(key) {
        this.#startKey = key;
    }

    setEndingPrompt(key) {
        this.#endKey = key;
    }

    #generatePrompts() {
        this.questions.forEach(element => {
            this.prompts.set(element.key, new Prompt(element));
            this.keys.push(element.key);
        });

        this.#startKey = this.keys[0];
        this.#endKey = this.keys[this.keys.length - 1];
    }
}