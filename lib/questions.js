import Question from "./question.js";
import SimpleQuestion from "./simple-question.js";

export default class Questions {
    questions = [];
    constructor(questions = [], keys = []) {
        for (let i = 0; i < questions.length; i++) {
            if (questions[i] instanceof Question) {
                this.questions.push(questions[i]);
            } else if (questions[i] instanceof SimpleQuestion) {
                this.questions.push(new Question(questions[i].question, questions[i].title, ""));
            } else {
                if (keys[i] != null) {
                    this.questions.push(new Question(questions[i], keys[i], ""));
                } else {
                    this.questions.push(new Question(questions[i], "", ""));
                }
            }
        }
    }

    add(question) {
        if (question instanceof Question) {
            this.questions.push(question);
        } else if (question instanceof SimpleQuestion)  {
            this.questions.push(new Question(question.question, question.title, ""));
        } else {
            this.questions.push(new Question(question, "", ""));
        }
    }
}