
// user, token

import { createContext, useState, useContext, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();


export const useAuth = () => {

    const context = useContext(AuthContext);

    if(!context){
        throw new Error("UseAuth must be used within authprovider");
    }

    return context;

}


   
   
export const AuthProvider = ({children}) => {


    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {

        const token = localStorage.getItem("token");

        if(token){
            fetchUserProfile();
        }else{
            setLoading(false)
        }


    }, []);

    // Register
    const register = async(name, email, password) => {
        try{

            const { data } = await api.post("/auth/register", {name, email, password});

            localStorage.setItem("token", data.token);

            setUser(data)

            return {success:true, data}

        }catch(error){
            return {success:false, error:error || "Registration failed"}
        }
    }


    // Register
    const login = async( email, password) => {
        try{

            const { data } = await api.post("/auth/login", { email, password});

            console.log(data);

            localStorage.setItem("token", data.token);

            setUser(data)

            return {success:true, data}

        }catch(error){
            return {success:false, error:error || "Registration failed"}
        }
    }

    const fetchUserProfile = async() => {

        try{

            console.log("hai")
            const { data } = await api.get("/auth/profile");

            console.log("Hello")

            setUser(data)

            

        }catch(error){
           localStorage.removeItem("token");
        }finally{
            setLoading(false)
        }

    }

    const logout = async() => {
        localStorage.removeItem("token");
        setUser(null);
    }

    const value = {
        user,
        loading,
        register,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}
