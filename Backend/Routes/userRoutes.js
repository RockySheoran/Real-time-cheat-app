import express from "express"
import { otherUser, userLogin, userLogout, userRegister } from "../Controller/userController.js";
import { isAuthenticated } from "../Middleware/middleware.js";

const userRoute = express.Router();


userRoute.post("/register", userRegister);
userRoute.post("/login", userLogin);
userRoute.get("/logout", isAuthenticated, userLogout);
userRoute.get("/otherUser", isAuthenticated,otherUser);

export default userRoute;