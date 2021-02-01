import express from "express"

import Products from "../Models/ProductSchema.js"
import asyncHandler from "express-async-handler"
const routes=express();



routes.get("/",asyncHandler(async(req,res)=>{
    const products=await Products.find({});
    res.json(products)
}))
routes.get("/:id",asyncHandler(async(req,res)=>{
    const product=await Products.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("chuda nadi")
    }
    
    // Products.findById(req.params.id).then((product) => {
    //     if (!product) {
    //         return res.status(404).send()
    //     }

    //     return res.send(product)
    // }).catch((error) => {
    //     return res.status(500).send(error.message)
    // })
}))

export default routes;