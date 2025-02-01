import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJWToken from "./../lib/utils.js"

export const signup = async (req, res)=>{

    const {firstName, lastName, email, userName, password} = req.body;

    try {
        if(password.length < 8){
            return res.status(400).json({message: "Password must be atleast 8 characters"});
        }
        

        const existingUser = await User.findOne({
            $or:[{email}, {userName}]
        });

        
        if(existingUser){ 
            if(existingUser.email === email){
                return res.status(400).json({message: "Email already in use"});
            }
            if(existingUser.userName === userName){
                return res.status(400).json({message: "UserName already taken"});
            }
        }

        // password hasing using bcryptjs
        const salt = await bcrypt.genSalt(10);
        const hashedPwd = await bcrypt.hash(password, salt);

        //new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            userName,
            password : hashedPwd
        });

        // if it really is a new user
        if(newUser){
            // generate JWT - Json Web Token (from utils.js)
            generateJWToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                userName: newUser.userName
            });

        }else{
            return res.status(400).json({message: "Invalid User Data"});
        }


    } catch (error) {

        console.log("Error in signUp:", error.message);
        res.status(500).json({message: "Server crashed"});
        
    }
};


export const login = (req, res)=>{
    res.send("login route");
};


export const logout = (req, res)=>{
    res.send("logout route");
};