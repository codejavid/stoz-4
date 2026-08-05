

const org = {
    name:"javid",
    email:"j@gmail.com",
    address:{
        city:"chennai",
        state:"TN"
    },
    hobbies:["music", "game"]
}

// Method 1 : Spread operator

const shallow1 = {...org};

// Method 2 
const shallow2 = Object.assign({}, org);

// Methode 3
const shallowArr1 = org.hobbies.splice();

// Method 4
const shallowArr2 = [...org.hobbies];


console.log(shallowArr2);
