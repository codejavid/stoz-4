

// ES5 - ES6


function Person(firstName, lastName){
  this.firstName = firstName;
  this.lastName = lastName;
  this.getFullName = function(){
    return this.firstName + " " + this.lastName;
  }
}


const person1 = new Person("Jagan", "Javid");
const person2 = new Person("Arun", "Kumar");

console.log(person1.getFullName());
console.log(person2.getFullName());


// console.log(person1);


// function x(){
//     console.log(this);
// }

// x();

// const y = {
//     a:function(){
//         console.log(this);
//     },
//     b:"test"
// }

// console.log(y.b);
// y.a();

