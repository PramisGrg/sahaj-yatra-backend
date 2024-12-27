import { Request, Response } from "express";
import { Router } from "express";

const mainRoutes = Router();

mainRoutes.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1 align='center'>Welcome to Sahaj Yatra API</h1>");
});

export default mainRoutes;
