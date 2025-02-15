import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js"
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import { messageRoutes } from "./routes/message.routes.js";

dotenv.config();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, () => {
    console.log(`server is running on PORT:${PORT}`);
    connectDB();
});