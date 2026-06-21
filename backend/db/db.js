import mongoose from "mongoose";

const ConnectDB = async() =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/ecommerce")
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Database connection failed", err);
    }
}

export default ConnectDB