const errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode
    res.status(statusCode);
    const eror={message:err.message,stack:process.env.NODE_ENV==="Production"?null:err.stack}
    res.json(eror)
    
}



const notFound=(req,res,next)=>{
    const error=new Error(`Not Found- ${req.originalUrl}`);
    res.status(404)
    next(error)
}

export {errorHandler,notFound}