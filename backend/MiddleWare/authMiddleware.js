import jwt from "jsonwebtoken"
import User from "../Models/UserSchema.js"
import asyncHandler from "express-async-handler"

export const protect=asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        console.log("token found");
    } 
    try {
        token =req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=await User.findById(decoded.id).select("-password")
        
    } catch (error) {
        console.error(error)
        throw new Error("token not authorized")
    }
    if(!token){
        console.log("Token nathi");
        throw new Error("error aavyo che")
    }
    // console.log(user)
    next()
})

export const admin=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }
    else{
        res.status(401)
        throw new Error("Ala tu Admin nadi")
    }
})