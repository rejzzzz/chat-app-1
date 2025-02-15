import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.lib.js";

export const sidebarUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filterUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filterUsers);
    } catch (error) {
        console.log("error: sidebarUsers - message.controller");
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getMessages = async(req, res) => {
    try {
        const {id:otherUserId} = req.params;
        const senderUserId = req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:senderUserId, receiverId: otherUserId},
                {senderId:otherUserId, receiverId: senderUserId},
            ]
        });

        res.status(200).json(messages);

    } catch (error) {
        console.log("error: getMessages - message.controller");
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const sendMessage = async(req, res) => {
    try {
        const {id:receiverId} = req.params;
        const {text, image} = req.body;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            // upload base64 image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
         
        await newMessage.save();

        // socket.io

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("error: sendMessage - message.controller");
        res.status(500).json({message:"Internal Server Error"}); 
    }
}