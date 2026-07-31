

// const sayHello = function(){
//     console.log("Hello");
// }


// Arrow function

// const sayHello = () => {
//     return "Hello";
// }

// One line function doest not need a braces

// const sayHello = () => "Hello";
// const sayHello = () => 5;
// const sayHello = () => true;
// const sayHello = () => [1,2,3];
// const sayHello = () => {};

// Return object in a one line

// const sayHello = () => ({msg:"Hello"});

// Single params does not need a parentheses

// const sayHello = name => `Hello ${name}`;
// const sayHello = (firstName, lastName) => `Hello ${firstName} ${lastName}`;


// console.log(sayHello("Javid","Jagan"))

const users = ["javid", "jagan", "akash"];

// users.forEach(function(user){
//     console.log(user);
// })

// users.forEach(user => console.log(user)); 

users.forEach( (user, index) => {
    console.log(`${user} --- ${index}`)
});
