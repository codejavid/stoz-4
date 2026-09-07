import jwt from "jsonwebtoken";
import User from "../models/User.js"


// Protect route

export const protect = async(req, res, next) => {

    // const check = true;

    // req.user = "test user"

    // if(check){
    //     console.log(req.user);
    //     next()
    // }else{
    //     console.log("I cant do anything")
    // }

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        try{

            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log(req.user)

            req.user = await User.findById(decoded.id).select("-password");

            console.log(req.user)

            // User is there in a DB

            next();

    


        }catch(error){
            console.log(error);
        }

    }else{
        console.log("NO");
    }

}


// Admin middleware

export const admin = (req, res, next) => {

    if(req.user && req.user.isAdmin){
    
        next();

    }else{
        res.status(401).json({message:"Not authorized as admin"})
    }

}