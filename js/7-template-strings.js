

const name = "Javid";
const job = "Web Dev";
const city = "Chennai";


let html;

// without template strings
// html = "My name is" + " " + name + " " + "and my job is" + " " + job + " " + "im form" + " " + city; 

// with template string

const x = "Hello";
const y = 'Hai';
const z = `Vanakam`;


console.log(x,y,z);

// With template strings
html = `My name is ${name} my job is ${job} and im from ${city}`;


console.log(html);

