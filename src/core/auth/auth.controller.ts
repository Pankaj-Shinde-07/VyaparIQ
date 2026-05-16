import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { catchAsync } from "../../shared/utils/catchAsync";

export const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);
  res.status(201).json({
    status: "success",
    data: result,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const refresh = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.refresh(req.body.refreshToken);
  res.status(200).json({
    status: "success",
    data: result,
  });
});

// synced
