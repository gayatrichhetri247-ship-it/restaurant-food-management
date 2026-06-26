import jwt from "jsonwebtoken"
import userModel from "../models/user.model.js";

export const varifyToken= async(req,res,next)=>{
    const token = req.cookies?.token;

    if(!token){
        return res.status(400).json({
            message:"token not provided",
            success:false,
        });
    }

    try{
         const encoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
         const user=await userModel.findById(encoded.id);
         req.user = user; 
         next();
    }
    catch(error){
        res.status(400).json({
            message:"Invalid Token",
            success:false
        })
    }

};
export const isAdmin = (req,res,next)=>{
   const user = req.user;

   if(user.role!=="admin"){
    return res.status(403).json({
        message:"Admin only",
        success:false
    });
   }
   next();
}