

// document.getElementsByClassName();


// HTML COLLECTION
const items = document.getElementsByClassName("collection-item");


// console.log(items);
// console.log(items[0]);
// console.log(items[1]);

// items.style.color = "blue";

// items[0].style.color = "blue";
// items[1].style.color = "blue";
// items[2].style.color = "blue";

// for(let i = 0; i < items.length; i++){
//     items[i].style.color = "blue";
// }

// console.log(Array.isArray(items));


// convert the HTML colletion to array
let lists = Array.from(items);


// console.log(lists);


// lists.forEach(function(li, index){
//     li.style.color = "blue";
// })

const listsItems = document.querySelectorAll(".collection-item"); // NODELIST

console.log(listsItems);

listsItems.forEach(function(li, index){
        li.style.color = "blue";
});