import { Router } from "express";
import {
  getSuperAdminDashboardController,
  getUserDashboardController,
  getBusownerDashboardController,
} from "../controllers/dashboard.controller";
import {
  isBusOwner,
  isSuperAdmin,
  isUser,
  validateToken,
} from "../middlewares/role.middleware";

const dashboardRouter = Router();

dashboardRouter.get(
  "/busowner",
  validateToken,
  isBusOwner,
  getBusownerDashboardController
);
dashboardRouter.get("/user", validateToken, isUser, getUserDashboardController);
dashboardRouter.get(
  "/superadmin",
  validateToken,
  isSuperAdmin,
  getSuperAdminDashboardController
);

export default dashboardRouter;
