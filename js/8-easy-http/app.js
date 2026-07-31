

const http = new EasyHTTP();

http.get("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users")
.then(data => console.log(data))
.catch(err => console.log(err));


const data = {
    name:"Jagan Javid"
}

const data2 = {
    name:"Javid Jagan"
}



http.post("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users", data)
.then(data => console.log(data))
.catch(err => console.log(err))

http.put("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users/6", data2)
.then(data => console.log(data))
.catch(err => console.log(err))


http.delete("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users/6")
.then(data => console.log(data))
.catch(err => console.log(err))