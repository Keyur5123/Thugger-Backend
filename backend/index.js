import express from "express";
import products from "./data/products.js" 
import dotenv from "dotenv"
import cors from "cors"
import colors from "colors"
import connectDB from "./config/db.js"
import ProductRoutes from "./routes/ProductRoutes.js"
import { errorHandler, notFound} from "./MiddleWare/errorMiddleWare.js"
dotenv.config();
const app=express();
app.use(cors())

connectDB();

// app.use((req,res,next)=>{
//     console.log(res)
//     next();
// })

// app.use(express.json()) 
app.get("/",(req,res)=>{
    res.send(`${products[0].name}`)
})

app.use("/products",ProductRoutes)

app.use(notFound)

app.use(errorHandler)

const port=process.env.port;
app.listen(port,console.log("Server chalu che".yellow.bold))

