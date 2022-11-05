import Prompt from "./prompt.js";

export default class Prompts {
    // Private properties
    #start;
    #end;

    constructor(...questions) {
        this.keys = [];
        this.answers = [];
        this.questions = questions;
        this.prompts = new Map();
        this.#generatePrompts();

        this.#start = this.keys[0];
        this.#end = this.keys[this.keys.length - 1];
    }

    start() {
        this.next(this.#start);
    }

    next(key) {
        let response = this.prompts[key].prompt();
        this.answers.push(response);
        this.end();
    }

    end() {
        let endResponse = this.prompts[this.#end].prompt();
        if (endResponse.key === this.prompts[this.#end].key) {
            return this.answers;
        } else {
            this.next(endResponse.key);
        }
    }

    setStartingPrompt(key) {
        this.#start = key;
    }

    setEndingPrompt(key) {
        this.#end = key;
    }

    #generatePrompts() {
        this.questions.forEach(element => {
            this.prompts.set(element.name, new Prompt(element));
            this.keys.push(element.name);
        });
    }
}

