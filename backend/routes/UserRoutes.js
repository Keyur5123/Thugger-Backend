import express from "express"
import {adminUser, authUser,createUser,deleteUser,getUserByAdmin,getUserProfile,updateUserByAdmin,updateUserProfile} from "../Controller/userController.js"
import {protect,admin} from "../MiddleWare/authMiddleware.js"
const routes=express();


routes.route("/profile").put(protect,updateUserProfile)
routes.post("/login",authUser)
routes.route("/profile").get(protect,getUserProfile)
routes.route("/").post(createUser).get(protect,admin,adminUser)
routes.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserByAdmin).put(protect,admin,updateUserByAdmin)


export default routes