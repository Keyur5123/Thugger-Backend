import express from "express"
import {getProducts,getProductById, deleteProductByAdmin,createProduct,updateProduct,createProductReviews, getTopProducts} from "../Controller/productsController.js"
import { admin, protect } from "../MiddleWare/authMiddleware.js";
const routes=express();



routes.route("/").get(getProducts).post(protect,admin,createProduct)
routes.route("/:id/reviews").post(protect,createProductReviews)
routes.get("/top",getTopProducts)
routes.route("/:id").get(getProductById).delete(protect,admin,deleteProductByAdmin).put(protect,admin,updateProduct)

export default routes;