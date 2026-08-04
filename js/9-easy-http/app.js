

const http = new EasyHttp();

http.get("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users")
.then(data => console.log(data))
.catch(err => console.log("Error"))


const data = {
    name:"Jagan"
}

const data2 = {
    name:"Javid"
}

http.post("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users", data)
.then(data => console.log(data))
.catch(err => console.log("Error"))



http.put("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users/1", data2)
.then(data => console.log(data))
.catch(err => console.log("Error"))


http.delete("https://6a6cb9ce9939b347cccf2382.mockapi.io/api/v1/users/10")
.then(data => console.log(data))
.catch(err => console.log("Error"))