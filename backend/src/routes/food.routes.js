import express from "express";
import { createfood, deleteFood, editFood, getFoods } from "../../controllers/food.controller.js";
import upload from "../middlewares/upload.middleware.js";
import { isAdmin, varifyToken } from "../middlewares/auth.middleware.js";

export const foodRoutes = express.Router();

foodRoutes.route("/create").post(varifyToken, isAdmin, upload.single("photo"), createfood);
foodRoutes.route("/").get(getFoods);
foodRoutes.route("/:id").delete(varifyToken, isAdmin, deleteFood);
foodRoutes.route("/:id").patch(varifyToken, isAdmin, upload.single('photo'), editFood);


