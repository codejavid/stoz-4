
document.querySelector("#btn-1").addEventListener("click", getUsers);


function getUsers(){


    const xhr = new XMLHttpRequest();


    xhr.open("GET", "https://jsonplaceholder.typicode.com/users", true);

    xhr.onload = function(){

        let output = "";

        if(this.status === 200){

            const users = JSON.parse(this.responseText);


            users.forEach(function (user) {
                
                output += `
                    <ul>
                        <li>ID : ${user.username}</li>
                        <li>Name : ${user.email}</li>
                    </ul>
                `;

            })

            document.querySelector("#users-output").innerHTML = output;

        }

    }

    xhr.send();


}