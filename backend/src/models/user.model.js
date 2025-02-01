import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // email validation regex
        },
        firstName:{
            type: String,
            required: true,
            trim: true

        },
        lastName:{
            type: String,
            trim: true,
            default: ''

        },
        password:{
            type: String,
            required: true,
            minlength: 8    // strong password

        },
        userName:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true 
        },
        createdAt:{
            type: Date,
            default: Date.now
        }

    },
    {timestamps: true} // Adds createdAt & updatedAt automatically
);

// Indexes for faster queries on frequently searched fields
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

export default User;