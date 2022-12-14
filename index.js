import fs from "fs/promises";
import path from "path";
import jsdom from "jsdom";
import Question from "./lib/prompts/question.js";
import Questions from "./lib/prompts/questions.js"
import Prompts from "./lib/prompts/prompts.js";
import TeamBuilder from "./lib/team/teambuilder.js";

// Using the below two lines to ensure node doesn't prematurely crash with recursive CLI
// import events from "events";
// events.EventEmitter.defaultMaxListeners = 0;

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

// Must take a team object instance
async function createWebsites(team) {
    // Generate DOM Model of Template
    const dom = await jsdom.JSDOM.fromFile(path.resolve("./src/template.html"));
    const document = dom.window.document;

    // Assign New Title
    let title = document.getElementsByTagName("title")[0];
    title.innerHTML = "Team Page Index";

    // Add Meta Redirect Tag
    let head = document.getElementsByTagName("Head")[0];
    let meta = document.createElement("meta");
    meta.httpEquiv = "Refresh";
    meta.content = `0; ${team.getManager().id}.html`;
    head.appendChild(meta);

    // Change reset.css source
    let reset = document.getElementById("reset");
    reset.href = "../dist/reset.css";
    let resetTemplate = await fs.readFile(path.resolve("./src/reset.css"));
    await fs.writeFile(path.resolve("./dist/reset.css"), resetTemplate);

    // Change style.css source
    let css = document.getElementById("style");
    css.href = "../dist/style.css";
    let cssTemplate = await fs.readFile(path.resolve("./src/template.css"));
    await fs.writeFile(path.resolve("./dist/style.css"), cssTemplate);

    await fs.writeFile(path.resolve(`./dist/index.html`), dom.serialize());

    await createWebsite(team.getLeader());
}

// Must take an employee object instance
async function createWebsite(employee) {
    // Generate DOM Model of Template
    const dom = await jsdom.JSDOM.fromFile(path.resolve("./src/template.html"));
    const document = dom.window.document;

    // Assign New Title
    let title = document.getElementsByTagName("title")[0];
    title.innerHTML = `${employee.data.name}'s Team`;

    // Change reset.css source
    let reset = document.getElementById("reset");
    reset.href = "../dist/reset.css";

    // Change style.css source
    let css = document.getElementById("style");
    css.href = "../dist/style.css";

    // Add team cards to the page
    const body = document.querySelector("body");

    // Create header section
    document.querySelector("h1").innerHTML = `${employee.data.name}'s Team`;

    // Aces main section
    const main = body.children[1];

    // Create manager "article"
    const managerArticle = document.createElement("article");
    managerArticle.id = "manager";
    managerArticle.appendChild(employee.data.html);

    const teamArticle = document.createElement("article");
    teamArticle.id = "team";
    let teamMembers = employee.children;
    for (const member of teamMembers) {
        if(member.data.getRole() === "Manager") {
            await createWebsite(member);
        }
        teamArticle.appendChild(member.data.html);
    }

    main.appendChild(managerArticle);
    main.appendChild(teamArticle);

    await fs.writeFile(path.resolve(`./dist/${employee.data.id}.html`), dom.serialize());
}

async function main() {
    // TODO: Move all of this into a class or classes. This looks too cluttered.
    let prompts = init();

    let builder = new TeamBuilder();
    builder.init(prompts, ["manager"], ["engineer", "intern"]);
    let team = await builder.start();

    await createWebsites(team);

}

main();