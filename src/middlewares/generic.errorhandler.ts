import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export async function genericErrorHandler(
  error: unknown,
  request: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(500).json({ message: "Internal Server Error" });
}
