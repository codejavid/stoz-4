const numbers = [5,3,23,54,65,34,87,98,45,11];


// console.log(numbers);


let val;

// Get the array length
val = numbers.length;

// Check if it is array
val = Array.isArray(numbers);

// Get a single value
val = numbers[0];
val = numbers[6];

// Change into array index value
val = numbers[2] = 32;


// Mutate array

// Add on the end
// val = numbers.push(1000);

// Add on the front
// numbers.unshift(2000);

// Take off the end
// numbers.pop();
// numbers.pop();

// Take off the front
// numbers.shift();
// numbers.shift();

const fruits = ["Apple", "Orange", "Kiwi", "Lemon"];

// Splice => ADD || REMOVE

// Splice to remove
// fruits.splice(0,1);

// Splice to add
fruits.splice(2,0, "Goa");

console.log(fruits);