

// const a = "a";
// const b = "b";
// const c = "c";

// console.log(a);

// console.log(c);
// console.log(b);

// function one(){
//     console.log("one");
// }

// function two(){
//     console.log("two");
// }

// function three(){
//     console.log("three");
// }

// one();
// three();
// two();


// Sync

const posts = [
    {title:"Post 1", body:"This is a post one"},
    {title:"Post 2", body:"This is a post two"},
];


// function createPost(post){
//     setTimeout(function(){
//         posts.push(post);
//     }, 2000)
// }

// function getPost(){
//     setTimeout(function(){

//         let output = "";

//         posts.forEach(function(post){
//             output += `<li>${post.title}<li>`
//         })

//         document.body.innerHTML = output;

//     }, 1000);
// }

// createPost({title:"Post 3", body:"This is a post three"})
// getPost();


// Async

function createPost(post, callback){
    setTimeout(function(){
        posts.push(post);

        callback();
    }, 2000)
}

function getPost(){
    setTimeout(function(){

        let output = "";

        posts.forEach(function(post){
            output += `<li>${post.title}<li>`
        })

        document.body.innerHTML = output;

    }, 1000);
}

