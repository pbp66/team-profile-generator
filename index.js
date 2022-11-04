import inquirer from "inquirer";
import Question from "./lib/question.js";
import Questions from "./lib/questions.js"
import Answer from "./lib/answer.js";

function init() {
    const questions = [
        new Question("What is the manager's name?", "manager", "", ""),
        new Question("What is the manager's employee ID?", "id", "", ""),
        new Question("What is the manager's email address?", "email", "", ""),
        new Question("What is the manager's office number?", "officeNumber", "", ""),
    ];

    return new Questions(questions);
}

async function main() {
    // TODO: Move all of this into a class or classes. This looks too cluttered.
    const managerQuestions = init();
    const engineerQuestionList = [
        new Question("What is the engineer's name?", "engineer", "", ""),
        new Question("What is the engineer's employee ID?", "id", "", ""),
        new Question("What is the engineer's email address?", "email", "", ""),
        new Question("What is the engineer's Github username?", "github", "", "")
    ];
    const internQuestionList = [
        new Question("What is the intern's name?", "engineer", "", ""),
        new Question("What is the intern's employee ID?", "id", "", ""),
        new Question("What is the intern's email address?", "email", "", ""),
        new Question("What is the intern's school?", "school", "", "")
    ];

    const engineerQuestions = new Questions(engineerQuestionList);
    const internQuestions = new Questions(internQuestionList);
    const choices = ["Engineer", "Intern", "Finish Building Team"];
    const teamBuilding = new Question("Do you want to add another employee?", "addEmployees", "rawlist", 0, choices);

    let teamResponse = {};
    let response = {};
    let endQuestions = false;

    let answers = await managerQuestions.askQuestions();
    console.log("\n");

    console.log(answers);
    console.log("\n");

    // TODO: Generate methods to call the appropriate prompt. This will improve dynamic generation as well as enable the addition of managers (teams within teams)

    do {
        teamResponse = await inquirer.prompt([ teamBuilding ]);
        if (teamResponse.addEmployees === "Engineer") {
            response = await engineerQuestions.askQuestions();
            console.log(response);
            console.log("\n");
        } else if (teamResponse.addEmployees === "Intern") {
            response = await internQuestions.askQuestions();
            console.log(response);
            console.log("\n");
        } else {
            // Complete team building
            endQuestions = true;
        }
    } while (!endQuestions)

}

main();