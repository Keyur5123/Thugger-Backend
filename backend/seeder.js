import mongoose from "mongoose"
import dotenv from "dotenv"
import colors from "colors"
import products from "./data/products.js"
import users from "./data/users.js"
import Users from "./Models/UserSchema.js"
import Product from "./Models/ProductSchema.js"
import Order from "./Models/OrderSchema.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB();

const insertData=async()=>{
    try {
        await Users.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers=await Users.insertMany(users)
        const adminUser=createdUsers[0]._id;

        const sampleProducts=products.map((p)=>{
            return {...p,user:adminUser}
        })

        await Product.insertMany(sampleProducts);
        console.log("import kari che data ".green.inverse)
        process.exit();
    } catch (error) {
        console.log(`${error}`.red.italic)
    }
}
const destroyData=async()=>{
    try {
        await Users.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log("Destroyed Data".red.italic);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.underline);
    }
}

if(process.argv[2]==="-d"){
    destroyData()
}
else{
    insertData();
}
