import inquirer from "inquirer";
import Question from "./lib/question.js";
import Questions from "./lib/questions.js"
import Prompts from "./lib/prompts.js";

function generateBaseQuestions(role) {
    // TODO: Generate validator functions for each question
    return [ // No default answers provided for these questions
        new Question(`What is the ${role}'s name?`, `${role}`, "input", ""),
        new Question(`What is the ${role}'s employee ID?`, "id", "input", ""),
        new Question(`What is the ${role}'s email address?`, "email", "input", "")
    ];
}

function generateQuestions(role) {
    let questions = generateBaseQuestions(role);
    let nextQ;
    // No default answers provided for any of these additional questions
    switch (role) {
        case "manager":
            nextQ = new Question("What is the manager's office number?", 
                "officeNumber", "input", "");
            break;
        case "engineer":
            nextQ = new Question("What is the engineer's Github username?", 
                "github", "input", "");
            break;
        case "intern":
            nextQ = new Question("What is the intern's school?", 
            "school", "input", "");
            break;
        default:
            return;
    }

    questions.push(nextQ);
    return new Questions(role, questions);
}

function init() {
    // TODO: Generate validator functions for each question
    let managerQuestions = generateQuestions("manager");
    let engineerQuestions = generateQuestions("engineer");
    let internQuestions = generateQuestions("intern");
    let finishedTeamQuestion = new Questions("finish",
        [
            new Question(
                "Add another employee or finish building current team?", 
                "finish", 
                "rawlist", 
                0, 
                [
                    "Manager", 
                    "Engineer", 
                    "Intern", 
                    "Finish"
                ]
            )
        ]
    );

    return new Prompts(
        managerQuestions, 
        engineerQuestions, 
        internQuestions, 
        finishedTeamQuestion
    );
}

async function main() {
    // TODO: Move all of this into a class or classes. This looks too cluttered.
    let prompts = init();
    let answers = await prompts.start();
    console.log("Answers:\n");
    console.log(answers);

}

main();