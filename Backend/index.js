import express from "express"
import dotenv from "dotenv"
import { db } from "./Config/db.js"
import userRoute from "./Routes/userRoutes.js"
import cookieParser from "cookie-parser"
import cors from 'cors'
import conversationRouter from "./Routes/conversationRouter.js"
import { Server } from "socket.io"
import http from "http"
import { app, server } from "./Socket/Socket.js";
import path from "path"

dotenv.config()

const port = process.env.PORT || 3000

// const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
const corsOptions = {
  // origin: 'https://chat-app1-fx7t.onrender.com',
  origin: 'http://localhost:5173',

  credentials: true, // Make sure this is lowercase
};
app.use(cors(corsOptions));

const _dirname = path.resolve();
// Routes
app.use("/api/v1/user", userRoute) // Fixed: Added the leading slash
app.use("/api/v1/message", conversationRouter)


app.get("/", (req, res) => {
  res.send("API is working")
})




server.listen(port, () => {
  db()
  console.log(`Server is connected successfully on port ${port}`)
})
