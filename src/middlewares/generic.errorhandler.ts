import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export async function genericErrorHandler(
  error: unknown,
  request: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Error",
      errors: error.errors.map((e) => ({
        field: e.path[0],
        message: e.message,
      })),
    });
  }

  return res.status(500).json({
    message: error instanceof Error ? error.message : "Something went wrong!",
  });
}
