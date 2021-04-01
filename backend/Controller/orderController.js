import Order from "../Models/OrderSchema.js"
import asyncHandler from "express-async-handler"

export const addOrderItems=asyncHandler(async(req,res)=>{
    const {shippingPrice,orderItems,paymentMethod,itemsPrice,taxPrice,
    shippingAddress,totalPrice}=req.body
    // console.log(req.body)
    if(orderItems && orderItems.length===0){
        res.status(401)
        throw new Error("Order item aj nadi ja gend marav")
    }

    const order=await Order({shippingPrice,orderItems,user:req.user._id,paymentMethod,itemsPrice,taxPrice,
        shippingAddress,totalPrice})
    
    const createdOrder=await order.save()

    res.status(201).json(createdOrder)
})

export const getOrderItems=asyncHandler(async(req,res)=>{
   
       const arder=await Order.findById(req.params.id).populate("user","name email")
       if(arder){
       res.json(arder)
       }
       else{
       res.status(404)
       throw new Error("Order not found")
       }
})
export const updateOrderItems=asyncHandler(async(req,res)=>{
    
        const order=await Order.findById(req.params.id)
        if(order){
            order.isPaid=true
            order.paidAt= Date.now()
            order.paymentResult={
                id:req.params.id,
                status:req.body.status,
                update_time:req.body.updated_time,
                email_address:req.body.email
            }

            const updateOrder=await order.save()
            res.json(updateOrder)
        }
        else{
        res.status(404)
        throw new Error("Could not update")
        }
})

export const myOrderItems=asyncHandler(async(req,res)=>{
    
    const orders=await Order.find({user:req.user._id})
        res.json(orders)
    
    
})


export const AllOrderItems=asyncHandler(async(req,res)=>{
    
    const orders=await Order.find({})
    .populate("user","name")
        res.json(orders)
    
    
})


export const updateOrderToDelivered=asyncHandler(async(req,res)=>{
    
    const order=await Order.findById(req.params.id)
    if(order){
        order.isDelivered=true
        order.deliveredAt= Date.now()
        

        const updateOrder=await order.save()
        res.json(updateOrder)
    }
    else{
    res.status(404)
    throw new Error("Could not update")
    }
})
