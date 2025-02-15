import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

export const protectRoute = async (req , res , next) =>{
    try {
        const token = req.cookies.authToken;

        if(!token){
            return res.status(401).json({message:"Token not Found"});
        }

        let check;
        try {
            check = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Invalid or Expired Token" });
        }

        if(!check || !check.userId){
            return res.status(401).json({message:"Invalid Token"});
        }

        const user = await User.findById(check.userId).select("-password");  // userId - from utils.js inside token

        if(!user){
            return res.status(404).json({message:"User Not Found"});
        }

        req.user = user;

        next();

    } catch (error) {
        console.log("Error: protectRoute.middleware");
        return res.status(500).json({message:"Internal Server Error"});
        
    }
}