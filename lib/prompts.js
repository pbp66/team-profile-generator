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

    async start() {
        return await this.next(this.#start);
    }

    async next(key) {
        //console.log(key);
        //console.log(this.prompts.get(key));
        let response = await this.prompts.get(key).prompt();
        this.answers.push(response);
        return await this.end();
    }

    async end() {
        let endResponse = await (this.prompts.get(this.#end)).prompt();
        if (endResponse.key === this.prompts.get(this.#end).key) {
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

