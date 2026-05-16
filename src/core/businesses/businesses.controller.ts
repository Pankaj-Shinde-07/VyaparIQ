import { Request, Response } from "express";
import { BusinessService } from "./businesses.service";
import { UserService } from "../users/users.service";
import { catchAsync } from "../../shared/utils/catchAsync";
import { AppError } from "../../shared/utils/AppError";

export const createBusiness = catchAsync(
  async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const user = await UserService.getUserById(userId);

    if (user.businessId) {
      throw new AppError("User already has a business", 400);
    }

    const business = await BusinessService.createBusiness(req.body, userId);

    res.status(201).json({
      status: "success",
      data: business,
    });
  },
);

export const getMyBusiness = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.userId;
  const user = await UserService.getUserById(userId);

  if (!user.businessId) {
    throw new AppError("No business associated with this user", 404);
  }

  const business = await BusinessService.getBusinessById(user.businessId);
  res.status(200).json({
    status: "success",
    data: business,
  });
});

export const updateMyBusiness = catchAsync(
  async (req: Request, res: Response) => {
    const userId = (req as any).user.userId;
    const user = await UserService.getUserById(userId);

    if (!user.businessId) {
      throw new AppError("No business associated with this user", 404);
    }

    const business = await BusinessService.updateBusiness(
      user.businessId,
      req.body,
    );
    res.status(200).json({
      status: "success",
      data: business,
    });
  },
);

// synced
