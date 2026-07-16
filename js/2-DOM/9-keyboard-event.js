

const taskInput = document.querySelector("#task");


// KeyboardEvent
// taskInput.addEventListener("keydown", runEvent);
// taskInput.addEventListener("keyup", runEvent);
// taskInput.addEventListener("input", runEvent);
// taskInput.addEventListener("keypress", runEvent);
// taskInput.addEventListener("focus", runEvent);
// taskInput.addEventListener("blur", runEvent);
// taskInput.addEventListener("cut", runEvent);
// taskInput.addEventListener("copy", runEvent);
// taskInput.addEventListener("paste", runEvent);


function runEvent(e){
    // console.log(e.target);
    console.log(e.target.value);
}