

let val;

const list = document.querySelector(".collection");
const firstListItem = document.querySelector("li:nth-child(1)");
const lastListItem = document.querySelector("li:nth-child(5)");

val = list;

val = list.childNodes;
val = list.childNodes[0].nodeName;
val = list.childNodes[1].nodeName;
val = list.childNodes[2].nodeName;
val = list.childNodes[0].nodeType;
val = list.childNodes[1].nodeType;
val = list.childNodes[2].nodeType;

// 3 - Text Node
// 1 - Element Node
// 8 - Comment Node

// Get the children element node
val = list.children;
val = list.children[0].children[0];

// First child
val = list.firstElementChild;

// last child
val = list.lastElementChild;

// Child cound
val = list.childElementCount;

// Get a parant node
val = list.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

// Get a next siblings
val = firstListItem.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling;

// // Get a previous siblings
val = lastListItem.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling;

console.log(val);