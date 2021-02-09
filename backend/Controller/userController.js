import User from "../Models/UserSchema.js"
import asyncHandler from "express-async-handler"
import generateWebToken from "../utils/generateWebTokens.js"

export const createUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const userExists=await User.findOne({email})
    if(userExists){
        res.status(404)
        throw new Error("pilla thi aj user che")
    }
    const user=await User.create({
        name,
        email,
        password,
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateWebToken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("User data invalid che")
    }
})


export const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    
    // res.send({email:email,password:password})

    const user=await User.findOne({email})
   
    if(user &&(await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateWebToken(user._id)

        })
    }
    else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})


export const getUserProfile=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.user._id)

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
    
    

})
 