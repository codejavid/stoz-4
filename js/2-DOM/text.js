

// const a = document.querySelector(".card-title").innerText;
// const b = document.querySelector(".card-title").textContent;

// console.log(a)
// console.log(b)


// (...)


// const numbers = [10, 20, 30];

// function add(a,b,c){
//     console.log(a + b + c);
// }

// add(...numbers)

// function add(...anotheNumber){
//   console.log(anotheNumber);
// }

// add(10, 20,30);

// const person = {
//     name:"javid",
//     skills:["JS", "Python"]
// }

// const copy = {...person};

// console.log(person);
// console.log(copy);

// copy.skills.push("AI");

// console.log(person);




const person = {
    name:"javid",
    skills:["JS", "Python"]
}

const copy = structuredClone(person);

console.log(person);
console.log(copy);

copy.skills.push("AI");

console.log(person.skills);

console.log(copy);



