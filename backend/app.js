import express from "express"
import userRoutes from "./src/routes/user.router.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
import foodRoutes from "./src/routes/food.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
const app = express();

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "Backend is working",
  });
});
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));
app.use("/users", userRoutes);
app.use("/foods", foodRoutes);
app.use("/orders", orderRoutes);

export default app;
