{/* <li class="collection-item">
    List Item 1
    <a href="#" class="delete-item secondary-content test" title="im Link">
        <i class="fa fa-remove"></i>
    </a>
</li> */}

const ul = document.querySelector(".collection");


// Create element
const li = document.createElement("li");

// Add class
li.className = "collection-item";
li.id = "test-1";

// Add a text
li.innerText = "Hello world";

// Create a new link element
const link = document.createElement("a");

// Add a class to link
link.className = "delete-item secondary-content";

// Add a icon to link
link.innerHTML = `<i class="fa fa-remove"></i>`;

// Append link to li
li.appendChild(link);


// Append li to ul

ul.appendChild(li);