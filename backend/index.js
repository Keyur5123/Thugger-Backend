import express from "express";
import products from "./data/products.js" 
import dotenv from "dotenv"
import cors from "cors"
import colors from "colors"
import connectDB from "./config/db.js"

dotenv.config();
const app=express();
app.use(cors())

connectDB();

app.get("/",(req,res)=>{
    res.send(`${products[0].name}`)
})
app.get("/products",(req,res)=>{
    res.json(products)
})
app.get("/products/:id",(req,res)=>{
    const product=products.find((p)=>p._id===req.params.id)
    res.send(product)
})
const port=process.env.port;
app.listen(port,console.log("Server chalu che".yellow.bold))

