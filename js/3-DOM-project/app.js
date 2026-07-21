

// Define a UI vars
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#search");


// Load all event listerners

function loadEventListerners(){

    // DOM Load event
    document.addEventListener("DOMContentLoaded", getTasks);
    
    // Add task event
    form.addEventListener("submit", addTasks);

    // Remove task list
    taskList.addEventListener("click", removeTask);

    // Clear task list
    clearBtn.addEventListener("click", clearTask);

    // Filter a task event
    filter.addEventListener("keyup", filterTask);
}


function getTasks(){
    
    let tasks;

    if(localStorage.getItem("tasks") === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){

        // Create element
        const li = document.createElement("li");

        // Add class
        li.className = "collection-item";

        // Add a innerText
        li.innerText = task;

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
    })

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

        // Store in ls
        storeTaskInLocalStroage(taskInput.value);

        taskInput.value = "";
    }
}

function storeTaskInLocalStroage(inputValue){
    
    let tasks;

    // console.log(tasks);

    if(localStorage.getItem("tasks") === null){
        tasks = [];
        console.log("STEP-1");
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log("STEP-2")
    }

    // console.log(tasks);

    tasks.push(inputValue);

    // console.log(tasks);

    localStorage.setItem("tasks", JSON.stringify(tasks));


}


function removeTask(e){
//    if(e.target.parentElement.className === "delete-item secondary-content"){
//     if(confirm("Are you sure")){
//         e.target.parentElement.parentElement.remove();
//     }
//    }

    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure")){
            e.target.parentElement.parentElement.remove();
        }

        removeTaskFromLs(e.target.parentElement.parentElement)
    }
}


function removeTaskFromLs(taskElement){

    let tasks;

    // console.log(tasks);

    if(localStorage.getItem("tasks") === null){
        tasks = [];
        console.log("STEP-1");
    }else{
        tasks = JSON.parse(localStorage.getItem("tasks"));
        console.log("STEP-2")
    }

    tasks.forEach(function(task, index){
       
        if(taskElement.innerText === task){
            tasks.splice(index, 1);
        }

    })

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


function clearTask(){
    taskList.innerHTML = "";

    // const allList = document.querySelectorAll("ul");

    // allList.forEach(function(li){
    //    li.remove()
    // })

    clearFromLs();
}

function clearFromLs(){
    localStorage.removeItem("tasks");
}


function filterTask(e){


   const text = e.target.value.toLowerCase();

   document.querySelectorAll(".collection-item").forEach(function(task){

    const item = task.innerText;

    // console.log(item.toLowerCase().indexOf(text));

    if(item.toLowerCase().indexOf(text) != -1){
        task.style.display = "block"
    }else{
        task.style.display = "none"
    }
   })
   

}

// const arr = ["Hello", "Hai", "Vanakam"];

// console.log(arr.indexOf("test"));


loadEventListerners();