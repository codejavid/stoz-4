


// document.querySelector(".clear-tasks").addEventListener("click", function(){
//    console.log("Hello");
// });


let count = 0;


document.querySelector(".clear-tasks").addEventListener("click", onClick);



function onClick(){

    count++;

    document.querySelector("#task-title").innerText = count;

    const body = document.querySelector("body");

    // console.log(body.className);

    // body.classList.add("add-color");

    body.classList.toggle("add-color");

}


