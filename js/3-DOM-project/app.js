

// Define a UI vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#search");


// Load all event listerners

function loadEventListerners(){
    
    // Add task event
    form.addEventListener("submit", addTasks);
}


function addTasks(e){

    e.preventDefault();

    // Validate
    // if()
    if(taskInput.value === ""){
        alert("Please fill the fields")
    }else{
        
        // Create element
        const li = document.createElement("li");

        // Add class
        li.className = "collection-item";

        // Add a innerText
        li.innerText = taskInput.value;

        // Create a new link element
        const link = document.createElement("a");

        // Add class to link
        link.className = "delete-item secondary-content"

        // Add a icon
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        // Add a link to li
        li.appendChild(link);

        // Add a li to ul
        taskList.appendChild(li);

        taskInput.value = "";
    }
}


loadEventListerners();