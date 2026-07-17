import express from "express";
import { varifyToken } from "../middlewares/auth.middleware.js";
import { createOrder, getOrderById, getOrders, success, updateOrder } from "../../controllers/order.controller.js";


export const orderRoutes = express.Router();

orderRoutes.route("/create").post(varifyToken,createOrder);
orderRoutes.patch("/:id", varifyToken, updateOrder);
orderRoutes.route("/success").get(success);
orderRoutes.route("/:id").get(getOrderById);
orderRoutes.route("/").get(getOrders);

