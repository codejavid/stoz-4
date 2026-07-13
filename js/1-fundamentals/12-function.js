

// Two phase

// 1 - creation
// 2 - excution


// Function declartion || Function statement

function greet(firstName = "John", lastName = "Doe"){

    // Default parameter

    // if(typeof firstName === "undefined"){firstName = "John"}
    // if(typeof lastName === "undefined"){lastName = "Doe"}

    // console.log("Hello");
    return `Hello ${firstName} ${lastName}`;
}

// console.log(greet());
// console.log(greet("Jagan", "Javid"));


// Function Expression

const add = function(x){
    console.log(x + 5);
}

add(5);

