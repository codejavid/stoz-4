

// console.log("Start");


// setTimeout(() => {
//     console.log("Time out")
// }, 0)

// Promise.resolve().then(() => {
//     console.log("Promise");
// })


// console.log("END");


console.log("A");

// Macrotask
setTimeout(() => console.log("B Settimeout"), 0);

// Microtask
Promise.resolve().then(() => console.log("C Promise"));

// Anthore microtask
queueMicrotask(() => console.log("D queueMicroTask"));

// Another macrotask
setTimeout(() => console.log("E Settimeout"), 0);

console.log("F");

// A,F,C,D,B,E
