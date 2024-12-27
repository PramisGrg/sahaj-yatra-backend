import type { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateBody(schema: ZodSchema) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const parseResult = schema.parse(req.body);
      req.body = parseResult;
      return next();
    } catch (error) {
      return next(error);
    }
  };
}
