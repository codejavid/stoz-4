

const API = "https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users";

const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const userDiv = document.getElementById("users");

let editId = null;


// Read

async function getUsers() {
    
    try{

        const res = await fetch(API);

        const users = await res.json();

        userDiv.innerHTML = "";

       users.forEach((user) => {
        const div = document.createElement("div");

        div.classList.add("user");

        div.innerHTML += `
          <span>${user.name}</span>

            <div class="actions">
            <button
                class="edit"
                onclick="editUser('${user.id}','${user.name}')"
            >
                Edit
            </button>

            <button
                class="delete"
                onclick="deleteUser('${user.id}')"
            >
                Delete
            </button>
            </div>
        `;


        userDiv.appendChild(div);

       });

    }catch(error){
       console.log(error);
    }

}


// Create 
form.addEventListener("submit", async(e) => {

    e.preventDefault();

    const userData = {
        name:nameInput.value
    };

    try{
        
        if(editId){
           
            await fetch(`${API}/${editId}`, {
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                }, 
                body:JSON.stringify(userData)
            });

            editId = null;


            form.querySelector("button").textContent = "Save user";

        }else{
            await fetch(`${API}`, {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                }, 
                body:JSON.stringify(userData)
            });

        }

        form.reset();
        getUsers();

    }catch(error){
        console.log(error);
    }




})


// DELETE

async function deleteUser(id) {
 
   try{

    await fetch(`${API}/${id}`, {
        method:"DELETE"
    });

    getUsers();
   }catch(error){
    console.log(error);
   }
    
}

// EDIT

function editUser(id, name){

  nameInput.value = name;

  editId = id;

  form.querySelector("button").textContent = "update user";
  

}


document.addEventListener("DOMContentLoaded", getUsers)