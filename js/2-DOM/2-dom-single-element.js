

// document.getElementById();

// console.log(document.getElementById("task-title"));

const taskTitle = document.getElementById("task-title");


// console.log(taskTitle);

// Change style

taskTitle.style.backgroundColor = "blue";
taskTitle.style.color = "#ffffff";
taskTitle.style.padding = "10px";

// Change content

console.log(taskTitle.innerText);

taskTitle.innerText = "<span>Hai</span>";
taskTitle.innerHTML = "<span>Hai</span>";

// document.querySelector()

// console.log(document.querySelector("#task-title"))
console.log(document.querySelector(".collection-item"));
// console.log(document.querySelectorAll(".collection-item"));