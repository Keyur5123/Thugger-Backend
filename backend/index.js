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

app.get("/",(req,res)=>{
    res.send(`${products[0].name}`)
    process.exit(1)
})

app.use("/products",ProductRoutes)

app.use("/user",UserRoutes)

app.use("/order",OrderRoutes)

app.use("/upload",UploadRoutes)

const __dirname=path.resolve()

app.use("/uploads",express.static(path.join(__dirname,"/uploads")))

app.get("/config/paypal",(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})

console.log(path.resolve());

app.use(notFound)

app.use(errorHandler)

const port=process.env.port;
app.listen(port,console.log("Server chalu che".yellow.bold))

