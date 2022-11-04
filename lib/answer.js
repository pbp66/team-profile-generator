export default class Answer {
    constructor(answerObj) {
        if (answerObj != null) {
            Object.assign(this, answerObj);
        }
    }
}