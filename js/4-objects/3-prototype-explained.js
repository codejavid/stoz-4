

function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
    // this.getFullName = function(){
    //     return `Hello ${this.firstName} ${this.lastName}`
    // }
}

const person1 = new Person("Jagan", "Javid");



Person.prototype.getFullName = function(){
    return `Hello ${this.firstName} ${this.lastName}`
}

console.log(person1);
console.log(person1.getFullName());



// person1.__proto__.__proto__.getFullName = function(){
//     return `Hello ${this.firstName} ${this.lastName}`
// };










