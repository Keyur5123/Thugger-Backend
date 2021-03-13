import express from "express"
import {addOrderItems, getOrderItems, updateOrderItems, myOrderItems} from "../Controller/orderController.js"
import {protect} from "../MiddleWare/authMiddleware.js"
const routes=express();

routes.route("/").post(protect,addOrderItems)
routes.route("/").get((req,res)=>{res.send("come on bay oh yeah")})
routes.route("/myorders").get(protect,myOrderItems)
routes.route("/:id").get(protect,getOrderItems)
routes.route("/:id/pay").put(protect,updateOrderItems)
export default routes;