import mongoose from "mongoose"

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect('mongodb+srv://Keyur5123:Keyur5123@cluster0.688vm55.mongodb.net/?retryWrites=true&w=majority',{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`MongoDB connection ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
        process.exit(1)
    }
}

export default connectDB