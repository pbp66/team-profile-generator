import inquirer from "inquirer";
import Question from "./lib/question.js";
import Questions from "./lib/questions.js"
import Answer from "./lib/answer.js";
import Prompts from "./lib/prompts.js";

function generateBaseQuestions(role) {
    // TODO: Generate validator functions for each question
    return [ // No default answers provided for these questions
        new Question(`What is the ${role}'s name?`, `${role}`, "input", ""),
        new Question(`What is the ${role}'s employee ID?`, "id", "input", ""),
        new Question(`What is the ${role}'s email address?`, "email", "input", "")
    ];
}

function init() {
    // TODO: Generate validator functions for each question
    // No default answers provided for any of these additional questions
    let managerQuestions = new Questions(
        generateBaseQuestions("manager").push(
            new Question(
                "What is the manager's office number?", 
                "officeNumber", 
                "input", 
                ""
            )
        )
    );

    let engineerQuestions = new Questions(
        generateBaseQuestions("engineer").push(
            new Question(
                "What is the engineer's Github username?", 
                "github", 
                "input", 
                ""
            )
        )
    );

    let internQuestions = new Questions(
        generateBaseQuestions("intern").push(
            new Question(
                "What is the intern's school?", 
                "school", 
                "input", 
                ""
            )
        )
    );

    let finishedTeamQuestion = new Questions(
        [
            new Question(
                "Add another employee or finish building your team:", 
                "addEmployees", 
                "rawlist", 
                0, 
                ["Manager", "Engineer", "Intern", "Finish Building Team"]
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

    let teamResponse = {};
    let response = {};
    let endQuestions = false;

    //et answers = await managerQuestions.askQuestions();
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