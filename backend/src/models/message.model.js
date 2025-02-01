import mongoose from "mongoose";

const msgSchema = new mongoose.Schema(
    {
        sender:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        conversationId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Conversation'
        },
        content:{
            type: String,
            required: true,
        },
        mediaUrl:{
            type: String,
            default: '',

        }
    },
    {
        timestamps: true
    }
);

const Message = mongoose.model('Message', msgSchema);
export default Message;