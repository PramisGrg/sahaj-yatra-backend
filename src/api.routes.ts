import { Router } from "express";
import authRouter from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import busRoutes from "./routes/bus.routes";
import transactionRoutes from "./routes/transaction.routes";
import dashboardRouter from "./routes/dashboard.routes";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/bus", busRoutes);
mainRoutes.use("/transaction", transactionRoutes);
mainRoutes.use("/dashboard", dashboardRouter);

export default mainRoutes;
