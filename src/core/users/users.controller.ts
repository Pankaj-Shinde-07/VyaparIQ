import { Request, Response } from "express";
import { UserService } from "./users.service.js";
import { catchAsync } from "../../shared/utils/catchAsync.js";

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const user = await UserService.getUserById(userId);
  res.status(200).json({
    status: "success",
    data: user,
  });
});

export const updateMe = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const updatedUser = await UserService.updateUser(userId, req.body);
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

// synced
