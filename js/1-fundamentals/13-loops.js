

// For loop

// Loop can excute a block of a code number of lines

// declare, condition, inc

// for(let i = 0; i <= 10; i++){
   
//     if(i === 4){
//         console.log(`${i} is a good number`);
//         continue;
//     }

//     if(i === 7){
//         console.log(`${i} hit stop the number`);
//         break;
//     }
    

//     console.log(i);


// }

const users = ["Jagan", "Javid", "Akash", "Arun"];


// console.log(users);
// console.log(users[0]);
// console.log(users[1]);


// console.log(users.length);

// for(let i = 0; i < users.length; i++){
//     console.log(users[i]);
// }


// users.forEach(function(user, index, arr){
//     console.log(`${user} - ${index}`);
//     console.log(arr);
// })

// For ...of loop

const fruits = ["Apple", "Banana", "Cherry"];

// for(const fruit of fruits){
//     console.log(fruit);
// }


// For in 

const names = {
    name:"Jagan", 
    email:"jj.gmailcom"
};

for(const key in names){
    console.log(`${key} - ${names[key]}`)
}

// console.log(names.name);
// console.log(names["email"]);


// While loop

let i = 0;

while(i < 5){
    console.log(i);
    i++
};