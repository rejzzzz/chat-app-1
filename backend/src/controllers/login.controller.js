import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJWToken from "../lib/utils.js";



export const login = async (req, res) => {

    const {emailLogin, identifier, password} = req.body;

    if(typeof emailLogin !== "boolean" || !identifier || !password){
        return res.status(400).json({message: "login Method(bool), Email/userName or Password is missing"});
    }

    try {
        let user;

        if(emailLogin){
            user = await User.findOne({ 
                email: identifier
            });
            console.log("Email login attempt:", identifier);
        }else{
            user = await User.findOne({
                
                    userName: identifier
                
            });
            console.log("Username login attempt:", identifier);
        }

        console.log("User found:", user);
        

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }
        

        //check pwd
        const checkPwd = await bcrypt.compare(password, user.password);
        if(!checkPwd){
            return res.status(401).json({message: "Incorrect Password"});
        }

        //jwt
        generateJWToken(user._id, res);

        res.status(200).json({
            message: "login successful",
            _id: user._id,
            firstName: user.firstName,
            userName: user.userName,
            email: user.email

        });
        
    } catch (error) {
        console.log("login error:", error);
        res.status(500).json({message: "Server crashed"});
    }
};

export const checkAuth = async(req , res ) => {
    try {
        return res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth");
        res.status(500).json({message: "Internal Server Error"});
    }
}