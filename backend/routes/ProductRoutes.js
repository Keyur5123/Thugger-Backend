import express from "express"
import {getProducts,getProductsById} from "../Controller/productsController.js"
import Products from "../Models/ProductSchema.js"
import asyncHandler from "express-async-handler"
const routes=express();



routes.route("/").get(getProducts)
routes.route("/:id").get(getProductsById)

export default routes;