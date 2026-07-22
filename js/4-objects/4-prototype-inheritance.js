

function Person(firstName, lastName){
    this.firstName = firstName;
    this.lastName = lastName;
}

Person.prototype.greeting = function(){
    return `Hello there ${this.firstName} ${this.lastName}`;
}

const javid = new Person("Jagan", "Javid");

console.log(javid);
console.log(javid.greeting());

// Customer object

function Customer(firstName, lastName, phone, membership){
    Person.call(this, firstName, lastName);
    this.phone = phone;
    this.membership = membership;
}


// Inhertit the person prototype methods to customers

// console.log();

Customer.prototype = Object.create(Person.prototype);

const javidCustomer = new Customer("Jagan", "Javid", "111-111-1111", "standard");

console.log(javidCustomer);