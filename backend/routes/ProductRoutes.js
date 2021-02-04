import express from "express"
import {getProducts,getProductById} from "../Controller/productsController.js"
const routes=express();



routes.route("/").get(getProducts)
routes.route("/:id").get(getProductById)

export default routes;