

// Primitive types

// String
const name = "Jagan";
const name2 = 'Jagan';

// Number
const age = 100;

// Boolean
const hadDinner = true;

// Null
const box = null;

// Undefined
let undef;

// console.log(undef);
// console.log(typeof undef);


// Refrence Types

// Array
const myArr = ["jagan", 123, true];

// Object 

const car = {
    // Property
    name:"BMW",
    color:"Black",
    // Method
    start:function(){
        console.log("Car started");
    }
}

console.log(car);
console.log(typeof car);

// Primitive create a new copy - by value

let a = 10;

let b = a;
b = 20;


// console.log(a);
// console.log(b);

// Reference (non-primitive) - by reference

let obj1 = {name:"Jagan"};

let obj2 = obj1;

obj2.name = "Javid";

console.log(obj1)
console.log(obj2)