import express from "express"
import {adminUser, authUser,createUser,getUserProfile,updateUserProfile} from "../Controller/userController.js"
import {protect,admin} from "../MiddleWare/authMiddleware.js"
const routes=express();


routes.route("/profile").put(protect,updateUserProfile)
routes.post("/login",authUser)
routes.route("/profile").get(protect,getUserProfile)
routes.route("/").post(createUser).get(protect,admin,adminUser)


export default routes