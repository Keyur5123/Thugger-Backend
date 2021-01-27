const express=require("express");
const products=require("./data/products") 
const app=express();
var cors = require('cors');
app.use(cors())

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
app.listen(5000,console.log("Server chalu che"))

