export default class Employee {
    // TODO: Provide validation for inputs
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
        this.html;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }

    createCardHTML() {
        let textProperties = Object.keys(this).filter(element => element !== "name");
        let cardText = [];
        for (const property of textProperties) {
            cardText.push(`\t\t<span class="card-text ${property}">${this[property]}</span>`);
        }

        let textSection = "<p>\n" + cardText.join("\n") + "\n\t</p>";

        let html = `<div class="card ${this.getRole().toLowerCase()}" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title name">${this.getName()}</h5>
        <h6 class="card-subtitle mb-2 text-muted role">${this.getRole()}</h6>
        ${textSection}
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
    </div>
</div>
      `;
      console.log(html);
      this.html = html;
    }
}