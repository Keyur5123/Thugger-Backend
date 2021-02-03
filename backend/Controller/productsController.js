import Products from "../Models/ProductSchema.js"
import asyncHandler from "express-async-handler"

export const getProducts=asyncHandler(async(req,res)=>{
    const products=await Products.find({});
    res.json(products)
})

export const getProductsById=asyncHandler(async(req,res)=>{
    const product=await Products.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("chuda nadi")
    }
})