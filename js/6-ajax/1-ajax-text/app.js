

document.querySelector("#btn").addEventListener("click", loadData);

function loadData(){

    const xhr = new XMLHttpRequest();

    // Open

    xhr.open("GET", "data.txt", true);


    xhr.onload = function(){

       if(this.status === 200){
        document.querySelector("#output").innerText = this.responseText;
       }else{
         document.querySelector("#output").innerText = `${this.statusText}`;
       }

    }

    xhr.send();

}