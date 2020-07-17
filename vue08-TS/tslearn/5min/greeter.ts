interface Person {
    firstName: String,
    lastName: String
}

class Student {
    fullName: String;
    constructor(public firstName, public middleInitial, public lastName) {
        this.fullName = firstName + " " + middleInitial + " " + lastName
    }
}

function greeter(person: Person) {
    return 'Hello ' + person.firstName + " " + person.lastName
}

let user = {
    firstName: 'Jane',
    lastName: 'User'
}

// user = new Student('Jane', 'M', 'UserClass')
user = new Student('Terry', 'M.', 'Y')

// document.body.innerHTML = greeter(user)
document.body.innerHTML = greeter(user)