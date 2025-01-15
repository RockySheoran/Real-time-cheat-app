import express from "express"

import { isAuthenticated } from "../Middleware/middleware.js"
import { getMessage, sendMessage } from "../Controller/messageController.js"

const conversationRouter = express.Router()

conversationRouter.post("/send/:id", isAuthenticated,sendMessage);
conversationRouter.get("/get/:id", isAuthenticated,getMessage)



export default conversationRouter
