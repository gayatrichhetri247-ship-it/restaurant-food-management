import express from "express"
import userRoutes from "./src/routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import foodRoutes from "./src/routes/food.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use("/api/users", userRoutes)
app.use("/api/foods", foodRoutes)
app.use("/api/orders", orderRoutes)

export default app;