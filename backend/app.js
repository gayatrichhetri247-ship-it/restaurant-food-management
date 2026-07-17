import express from "express"

import cookieParser from "cookie-parser";
import cors from 'cors'
import { userRoutes } from "./src/routes/user.router";
import { foodRoutes } from "./src/routes/food.routes";
import { orderRoutes } from "./src/routes/order.routes";

const app = express();


app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use("/api/users", userRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/orders", orderRoutes);

export default app;
