import cloudinary from "./../lib/cloudinary.lib.js" 
import User from "../models/user.model.js";

export const updateProfile = async(req , res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic){
            throw new Error("Picture Not Found");
        }

        const uploadRes = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {picture:uploadRes.secure_url}, {new:true});

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in uploading picture");
        res.status(500).json({message:"Internal Server Error"});
    }
}



