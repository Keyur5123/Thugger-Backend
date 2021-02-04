import express from "express"
import {authUser,createUser,getUserProfile} from "../Controller/userController.js"
import {protect} from "../MiddleWare/authMiddleware.js"
const routes=express();



routes.post("/login",authUser)
routes.route("/profile").get(protect,getUserProfile)
routes.route("/").post(createUser)


export default routes