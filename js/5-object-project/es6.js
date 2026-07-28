

// Book constructor

class Book{

    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

}

class UI{

    addBookToList(book){

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

    clearFileds(){
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#ISBN").value = "";
    }

    deleteBook(targetElement){
        if(targetElement.className === "delete"){
            targetElement.parentElement.remove();
        }
    }
    
    showAlert(message, className){
        // console.log(message, className);

        this.clearAlert();

        // Create a div element

        const div = document.createElement("div");

        // Add class Name

        div.className = `alert ${className}`;

        // Add a inner text
        div.innerText = message;

        document.querySelector(".show-alert").appendChild(div);

        setTimeout(function(){
            document.querySelector(".alert").remove();
        }, 3000)
    }

    clearTasks(){
        document.querySelector("#book-list").innerHTML = "";
    }

    clearAlert(){
        const currentAlert = document.querySelector(".alert");

        if(currentAlert){
            currentAlert.remove();
        }
    }
    

}


class Stroage{

    getBooks(){
        let books;

        if(localStorage.getItem("books") === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem("books"));
        }

        return books;

    }


    addBooks(book){

        // get a book array

        const books = this.getBooks();

        // Add book to array

        books.push(book);

        // Set in the local storage
        localStorage.setItem("books", JSON.stringify(books));

    }

    displayBook(){

        const books = this.getBooks();

        const ui = new UI();

        books.forEach(function(book){
            ui.addBookToList(book);
        })



    }

    deleteBooks(isbn){

        const books = this.getBooks();

        books.forEach(function(book, index){

            if(book.isbn === isbn){
                books.splice(index, 1);
            }


        })

        localStorage.setItem("books", JSON.stringify(books));

    }
    clearBooks(){
        localStorage.removeItem("books");
    }

}

const storage = new Stroage();

document.addEventListener("DOMContentLoaded", storage.displayBook());



// Event Listen for submit

document.querySelector("#book-form").addEventListener("submit", function (e) {

    e.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#ISBN").value;


    const book = new Book(title, author, isbn);
    const ui = new UI();
    const storage = new Stroage();




    if (title === "" || author === "" || isbn === "") {
        // alert("Please fill the form")
        ui.showAlert("Please fill the fields", "alert-danger");
    } else {


        let bookExist = false;

        const books = document.querySelectorAll("#book-list tr");

        for(const bookRow of books){
            
            const existingTitle = bookRow.querySelector("td:nth-child(1)").innerText;
            const existingIsbn = bookRow.querySelector("td:nth-child(3)").innerText;

            if(existingTitle === title || existingIsbn === isbn){

                bookExist = true;

                break;
            }

        }


        if(bookExist){
            // Show alert
            ui.showAlert("Book with the same name or isbn already exists", "alert-danger");
        }else{
             // Add book to the list
            ui.addBookToList(book);

            // Add to the storage
            storage.addBooks(book);

            // Show alert
            ui.showAlert("Book added successfully", "alert-success");

            // Clear Field
            ui.clearFileds();
        }

       
    }

});


// Delete event listener

document.querySelector("#book-list").addEventListener("click", function(e){
   
    if(e.target.parentElement.className === "delete"){


        const ui = new UI();

        const storage = new Stroage();

        const isbn = e.target.parentElement.previousElementSibling.innerText;

  

        ui.deleteBook(e.target.parentElement);

        storage.deleteBooks(isbn)

        // Show alert
        ui.showAlert("Book deleted successfully", "alert-success");
    }

})



// Clear the data

document.querySelector(".clear").addEventListener("click", function (e) {

    const ui = new UI();

    const storage = new Stroage();

    ui.clearTasks();

    storage.clearBooks();



});