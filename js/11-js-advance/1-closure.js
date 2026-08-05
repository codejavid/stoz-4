

function outer(){
 
    let secret = "Im private";

    return function inner(){
        console.log(secret);
    }
}

const clousureFunc = outer();

clousureFunc()
