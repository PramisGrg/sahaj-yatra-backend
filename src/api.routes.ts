import { Router } from "express";
import authRouter from "./routes/auth.routes";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);

export default mainRoutes;
