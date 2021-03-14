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

export const getUserByAdmin=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id).select("-password")

    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
    
    

})


export const updateUserProfile=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.user._id)

    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        if(req.body.password){
            user.password=req.body.password
        }
        const updatedUser=await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
    
    

})

export const updateUserByAdmin=asyncHandler(async(req,res)=>{
    const user =await User.findById(req.params.id)

    if(user){
        user.name=req.body.name||user.name
        user.email=req.body.email||user.email
        user.isAdmin=req.body.isAdmin
        
        const updatedUser=await user.save()

        res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }
    else{
        res.status(404)
        throw new Error("User not found")
    }
    
    

})


export const adminUser=asyncHandler(async(req,res)=>{
    const users =await User.find({})
    res.json(users)
    
    

})

export const deleteUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user && !user.isAdmin){
        user.remove();
        res.json({message:"Delete thai gayu che"})
    }
    else{
        res.status(404)
        throw new Error("Ala aevu koi user aj nai")
    }
})
