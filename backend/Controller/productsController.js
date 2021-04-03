import Products from "../Models/ProductSchema.js"
import asyncHandler from "express-async-handler"

export const getProducts=asyncHandler(async(req,res)=>{
    const pageSize=8
    const page=req.query.pageNumber ?req.query.pageNumber: 1
    const keyword=req.query.keyword? {
        name:{
            $regex:req.query.keyword,
            $options:"i"
        }
    }:{}
    const count=await Products.countDocuments({...keyword})
    const products=await Products.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    res.json({products,page:page,pages:Math.ceil(count/pageSize)})
})

export const getProductById=asyncHandler(async(req,res)=>{
    const product=await Products.findById(req.params.id);
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("chuda nadi")
    }
})

export const deleteProductByAdmin=asyncHandler(async(req,res)=>{
    const product=await Products.findById(req.params.id);
    if(product){
        await product.remove()
        res.json({message:"Delete thai gayu"})
    }else{
        res.status(404)
        throw new Error("Remove ni thai")
    }
})

export const createProduct=asyncHandler(async(req,res)=>{
    const product=new Products({
        
            price: 0,
            numReviews: 0,
            countInStock: 0,
            rating: 0,
            name: "Testing product",
            image: "/images/sample.jpg",
            description: "Test nu descripion",
            brand: "Apple",
            category: "Electronics",
            user:req.user._id          
        
    })
    const createdUser=await product.save()
    res.status(201).json(createdUser)
})

export const updateProduct=asyncHandler(async(req,res)=>{
    const {_id,price,numReviews,countInStock,rating,name,image,description,brand,category}=req.body
    const product=await Products.findById(_id)
    if(product){
        product.name=name
        product.price=price
        product.category=category
        product.brand=brand
        // product.numReviews=numReviews
        product.countInStock=countInStock
        product.description=description
        // product.rating=rating
        product.image=image
        const updatedProduct=await product.save()
        res.status(201).json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error("product ni malyu")        
    }
})



export const createProductReviews=asyncHandler(async(req,res)=>{
    const {comment,rating}=req.body
    const product=await Products.findById(req.params.id)
    if(product){
        const alreadyReviewed=await product.reviews.find(r => r.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error("Ala bhai pella si aj review marelo se")
        }
        const review={
            name:req.user.name,
            user:req.user._id,
            rating:Number(rating),
            comment
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length
        product.rating=product.reviews.reduce((acc,item)=>acc+item.rating,0)/product.reviews.length
        const updatedProduct=await product.save()
        res.status(201).json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error("product ni malyu")        
    }
})


export const getTopProducts=asyncHandler(async(req,res)=>{
    const products=await Products.find({}).sort({rating:-1}).limit(3)
    res.json(products)
})