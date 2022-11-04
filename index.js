import inquirer from "inquirer";
import Question from "./lib/question.js";
import Questions from "./lib/questions.js"
import Answer from "./lib/answer.js";

function init() {
    let questions = [
        new Question("What is the team manager's name?", "manager", "", ""),
        new Question("What is the employee ID for the manager?", "id", "", ""),
        new Question("What is the email address for the manager?", "email", "", ""),
        new Question("What is the office number?", "officeNumber", "", ""),
    ];

    return new Questions(questions);
}

function main() {
    let questions = init();
    const answers = inquirer.prompt(questions);
}

main();