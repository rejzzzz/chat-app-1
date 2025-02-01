import mongoose from "mongoose";


export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connection to mongoDB successful at ${conn.connection.host}`);

    }catch(error){
        console.log("Error connecting to db:", error);

    }
};
