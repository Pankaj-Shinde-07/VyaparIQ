import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error: any) {
      res.status(400).json({
        status: "fail",
        message: "Validation Error",
        errors: error.errors,
      });
    }
  };
};

// synced
