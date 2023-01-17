import path from "path"
import express from "express";
import products from "./data/products.js" 
import dotenv from "dotenv"
import cors from "cors"
import colors from "colors"
import connectDB from "./config/db.js"
import ProductRoutes from "./routes/ProductRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js"
import UploadRoutes from "./routes/UploadRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"
import { errorHandler, notFound} from "./MiddleWare/errorMiddleWare.js"
import bodyParser from "body-parser"
dotenv.config();
const app=express();
app.use(cors())
app.use(express.json())
connectDB();


// app.use((req,res,next)=>{
//     console.log(res)
//     next();
// })

// app.use(express.json()) 


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/products",ProductRoutes)

app.use("/api/user",UserRoutes)

app.use("/api/order",OrderRoutes)

app.use("/api/upload",UploadRoutes)

const __dirname=path.resolve()

app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

app.get("/api/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

if(process.env.NODE_ENV==="Production"){
    app.use(express.static(path.join(__dirname,"/frontend/build")))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}else{
    app.get("/",(req,res)=>{
        res.send(`${products[0].name}`)
        process.exit(1)
    })
}

console.log(path.resolve());

app.use(notFound)

app.use(errorHandler)

const port=process.env.port || 5000;
app.listen(port,console.log("Server is running...".yellow.bold))

