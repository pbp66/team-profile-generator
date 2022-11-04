export class Answer {
    constructor(answerObj) {
        if (answerObj == null) {
            this.generateEmptyObject();
        } else {
            this.title = answerObj.title;
            this.description = answerObj.description;
            this.installation = answerObj.installation;
            this.usage = answerObj.usage;
            this.contribution = answerObj.contribution;
            this.tests = answerObj.tests;
            this.license = answerObj.license;
            this.username = answerObj.username;
            this.email = answerObj.email;
        }
    }

    generateEmptyObject() {
        this.title = "";
        this.description = "";
        this.installation = "";
        this.usage = "";
        this.contribution = "";
        this.tests = "";
        this.license = "";
        this.username = "";
        this.email = "";
    }
}