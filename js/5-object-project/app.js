

// Book constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI
function UI() {

    // Add Book to list

    UI.prototype.addBookToList = function (book) {

        const list = document.querySelector("#book-list");

        // Create a TR element
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td class="delete">
                <span class="btn btn-danger">X</span>
            </td>   
        `;

        list.appendChild(row);

    }

    // Clear all the fields

    UI.prototype.clearFileds = function(){
       document.querySelector("#title").value = "";
       document.querySelector("#author").value = "";
       document.querySelector("#ISBN").value = "";
    }

    // Delete element
    UI.prototype.deleteBook = function(targetElement){
      
        if(targetElement.className === "delete"){
            targetElement.parentElement.remove();
        }

    }

    // Clear the tasks
    UI.prototype.clearTasks = function(){
        document.querySelector("#book-list").innerHTML = "";
    }


}


// Event Listen for submit

document.querySelector("#book-form").addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#ISBN").value;


    const book = new Book(title, author, isbn);
    const ui = new UI();

    console.log(ui);


    if (title === "" || author === "" || isbn === "") {
        alert("Please fill the form")
    } else {

        // Add book to the list
        ui.addBookToList(book);

        // Clear Field
        ui.clearFileds();
    }

});


// Delete event listener

document.querySelector("#book-list").addEventListener("click", function(e){
   
    console.log(e.target);
    console.log(e.target.parentElement);
    if(e.target.parentElement.className === "delete"){
        // console.log("Yes")

        const ui = new UI();

        // Delete Book

        ui.deleteBook(e.target.parentElement);
    }

})


// Clear the data

document.querySelector(".clear").addEventListener("click", function (e) {

    const ui = new UI();

    ui.clearTasks();



});