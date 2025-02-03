import express from "express";
import { signup } from "../controllers/signup.controller.js";
import { login } from "../controllers/login.controller.js";
import { logout } from "../controllers/logout.controller.js";
import  loginLimiter  from "../middleware/rateLimiter.js";


const router = express.Router();

router.post("/signup", signup);

router.use("/login", loginLimiter);
router.post("/login", login)

router.post("/logout", logout)


export default router;