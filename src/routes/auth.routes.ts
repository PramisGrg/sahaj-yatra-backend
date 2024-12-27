import { Router } from "express";
import authController from "../controllers/auth.controller";
import { userRegisterSchema } from "../schema/auth.schema";
import { validateBody } from "../middlewares/validatebody.middleware";

const router = Router();

//USER AUTH ROUTES
router.post("/login", authController.userLogin);
router.post(
  "/register",
  validateBody(userRegisterSchema),
  authController.userRegister
);

//ADMIN AUTH ROUTES
router.post("/login/admin", authController.busOwnerLogin);
router.post("/register/admin", authController.busOwnerRegister);

//SUPERADMIN AUTH ROUTES
router.post("/login/superadmin", authController.superAdminLogin);

export default router;
