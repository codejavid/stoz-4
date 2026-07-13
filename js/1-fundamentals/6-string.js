

const firstName = "Jagan";
const lastName = "Javid";


let val;


val = firstName + lastName;


// Concatenation
val = firstName + " " + lastName;

// Append
val = "john";

// val = val + " Doe";
val += " Doe";

// Length
val = firstName.length;

// Concat
val = firstName.concat(" ", lastName);

// Access
val = firstName[0];
val = firstName[1];

// CharAT
val = firstName.charAt("0");
val = firstName.charAt(3);

// Slice
const fruit = "Orange";

val = fruit.slice(1,4);

// Split
const str = "Hello im Jagan and im a web dev";
const tags = "Web dev, UI/UX, App Dev";


val = str.split(" ");
val = tags.split(",");

// Replace
val = str.replace("Jagan", "Javid");

// Include
val = str.includes("web");
val = str.includes("app");






console.log(val);
