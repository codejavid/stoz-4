

// Key and value or name and value


const person = {

    // Property
    firstName:"Jagan",
    lastName:"Javid",
    email:"j@gmail.com",
    hadDinner:false,
    hobbies:["music", "sports"],
    address:{
        city:"chennai",
        state:"TN"
    },
    // Method
    greet:function(){
        return "Hello guys"
    },
    getFullName:function(){
        return this.firstName + " " + this.lastName
    }
}


let val;

// (Object . )
val = person;


val = person.firstName; //***
val = person["lastName"];
val = person.email;
val = person.hobbies[0];
val = person.hobbies[1];
val = person.address.city;
val = person.address.state;
val = person.greet();
val = person.getFullName();

console.log(val);