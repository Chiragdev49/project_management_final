import { User } from "../models/user.js";
import { asyncHandler } from "./asyncHandler.js";
import ErrorHandler from "./error.js";
import  jwt from "jsonwebtoken";


export const isAuthenticated=asyncHandler(async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource.",401));
    }
    const decode=jwt.verify(token,process.env.JWT_SECRET);

    req.user=await User.findById(decode.id).select("-resetPasswordToken -resetPasswordExpire");
    if(!req.user){
        return next(new ErrorHandler("user not found with this id.",404));
    }
    next();
})

export const isAuthorized=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource`,
                    403
                )
            )
        }
        next();
    }
}