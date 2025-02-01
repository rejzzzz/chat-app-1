import mongoose from "mongoose";

const convSchema = new mongoose.Schema(
    {
        partcipants:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        lastMsg:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
        },
        createdAt:{
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true
    }
);

const Conversation = mongoose.model('Conversation', convSchema);

export default Conversation;