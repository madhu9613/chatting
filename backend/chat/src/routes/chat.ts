import express from "express";
import isAuth from "../middleware/isAuth";
import { createNewChat, getAllChats, getMessagesByChat, sendMessage } from "../controllers/chat";
import { upload } from "../middleware/multer.js";


const router = express.Router();


router.post("/chat/new",isAuth,createNewChat);
router.get("/chat/all",isAuth,getAllChats);
router.post("/send/message", isAuth, upload.single("image"), sendMessage);
router.get("/send/message/:chatId", isAuth, getMessagesByChat);

export default router;  