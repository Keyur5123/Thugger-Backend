import jwt from "jsonwebtoken"

const generateWebToken=(id)=>{
    const token = jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn:"30d"
    });
    return token
}

export default generateWebToken