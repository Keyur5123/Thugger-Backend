import path from "path"
import multer from "multer"
import express from "express"
const router=express.Router()

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,"uploads/")
    },
    filename(req,file,cb){
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file,cb){
    const fileTypes=/jpeg|jpg|png/
    const extname=fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype=fileTypes.test(file.mimetype)

    if(mimetype){
        return cb(null,true)
    }else{
        return cb("Ala image nadi")
    }
}

const upload=multer({
    storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    } 
})

router.post("/",upload.single("image"),(req,res)=>{
    res.send(`/${req.file.path}`)
})

export default router