import express from "express"
import { getMe, LoginUser, LogoutUser, registerUser } from "../../controllers/user.controllers.js";
import { varifyToken } from "../middlewares/auth.middleware.js";

const userRoutes = express.Router()

userRoutes.route("/sign-up").post(registerUser);
userRoutes.route("/login").post(LoginUser);
userRoutes.route("/logout").post(LogoutUser);
userRoutes.route("/get-me").get(varifyToken, getMe);

export default userRoutes;