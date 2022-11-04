import inquirer from "inquirer";
import { Question } from "./question";

export class Questions {

    questions = [];

    constructor(questions = [], keys = []) {
        for (let i = 0; i < questions.length; i++) {

            if (questions[i] instanceof Question) {
                this.questions.push(questions[i]);
            } else if (questions[i] instanceof SimpleQuestion) {
                this.questions.push(new Question(questions[i].question, questions[i].title));
            } else {
                if (keys[i] != null) {
                    this.questions.push(new Question(questions[i], keys[i]));
                } else {
                    this.questions.push(new Question(questions[i], ""));
                }
            }
        }
    }

    addQuestion(question) {
        if (question instanceof SimpleQuestion) {
            this.questions.push(question);
        } else {
            let newQ = new Question(question, "");
            this.questions.push(newQ);
        }
    }

    async askQuestions() {
        const answers = await inquirer.prompt(this.questions);
        return new a.Answer(answers);
    }
}