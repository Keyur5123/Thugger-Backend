import express from "express"
import {addOrderItems, getOrderItems, updateOrderItems, myOrderItems, AllOrderItems, updateOrderToDelivered} from "../Controller/orderController.js"
import {admin, protect} from "../MiddleWare/authMiddleware.js"
const routes=express();

routes.route("/").post(protect,addOrderItems).get(protect,admin,AllOrderItems)
routes.route("/").get((req,res)=>{res.send("come on bay oh yeah")})
routes.route("/myorders").get(protect,myOrderItems)
routes.route("/:id").get(protect,getOrderItems)
routes.route("/:id/pay").put(protect,updateOrderItems)
routes.route("/:id/deliver").put(protect,admin,updateOrderToDelivered)
export default routes;