import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"



const RegisterPage = () => {

  const [name,setName] = useState("t");
  const [email,setEmail] = useState("ttt@gmai.com");
  const [password,setPassword] = useState("123456");
  const [confirmPassword,setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const {register} = useAuth();


  const handleSubmit = async(e) => {

    e.preventDefault();

    const result = await register(name, email, password)

    if(result.success){
       navigate("/")
    }else{
      console.log("Error");
    }


  }


  return (
    <>
    
       <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h1>

       <div className="container mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
              <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="enter a name" value={name}
              onChange={(e) => setName(e.target.value)}/>
          </div>
           <div className="mb-4">
              <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="enter a email" value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
           <div className="mb-4">
              <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="enter a password" value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>
           {/* <div className="mb-4">
              <input type="text" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="enter a confirmPassword" value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div> */}
          <button className="bg-gray-400">Register</button>
        </form>
       </div>
    </>
  )
}

export default RegisterPage