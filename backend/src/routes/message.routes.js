import express from 'express';
import { protectRoute } from '../middleware/protectRoute.middleware.js';
import { getMessages, sendMessage, sidebarUsers } from '../controllers/message.controller.js';

const router  = express.Router();

router.get("/users", protectRoute, sidebarUsers);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export {router as messageRoutes};