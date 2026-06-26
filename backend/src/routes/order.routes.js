import express from "express";
import { varifyToken } from "../middlewares/auth.middleware.js";
import { createOrder, getOrderById, getOrders, success } from "../../controllers/order.controller.js";


const orderRoutes = express.Router();

orderRoutes.route("/create").post(varifyToken,createOrder);
orderRoutes.route("/success").get(success);
orderRoutes.route("/:id").get(getOrderById);
orderRoutes.route("/").get(getOrders);


export default orderRoutes;