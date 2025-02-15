import express from "express";
import { signup } from "../controllers/signup.controller.js";
import { login, checkAuth } from "../controllers/login.controller.js";
import { logout } from "../controllers/logout.controller.js";
import { loginLimiter } from "../middleware/rateLimiter.middleware.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import { updateProfile } from "../controllers/updateProfile.controller.js";


const router = express.Router();

router.post("/signup", signup);

router.use("/login", loginLimiter);
router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute,  updateProfile);

router.get("/check", protectRoute, checkAuth);


export default router;