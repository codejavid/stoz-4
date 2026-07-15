

// Remove element

const list = document.querySelector("li");

// console.log(list);

// list.remove();

const lists = document.querySelectorAll("li"); // Nodelist

// lists.forEach(function(list){
//     list.remove();
// })

// Class & attr

const firstLi = document.querySelector("li:nth-child(1)");


const link = firstLi.children[0];

let val;

val = link.className; // Return a string
val = link.classList; // DOMTokenList

val.add("javid");

val.remove("test");

val.replace("javid", "jagan");

console.log(val);
