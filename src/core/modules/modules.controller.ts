import { Request, Response } from "express";
import { ModuleService } from "./modules.service";
import { UserService } from "../users/users.service";
import { catchAsync } from "../../shared/utils/catchAsync";
import { AppError } from "../../shared/utils/AppError";

const getBusinessId = async (req: Request) => {
  const userId = (req as any).user.userId;
  const user = await UserService.getUserById(userId);
  if (!user.businessId)
    throw new AppError("User does not have a business", 400);
  return user.businessId;
};

export const listAvailableModules = catchAsync(
  async (req: Request, res: Response) => {
    const modules = await ModuleService.getAvailableModules();
    res.status(200).json({ status: "success", data: modules });
  },
);

export const listMyModules = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const modules = await ModuleService.getBusinessModules(businessId);
  res.status(200).json({ status: "success", data: modules });
});

export const subscribeToModule = catchAsync(
  async (req: Request, res: Response) => {
    const businessId = await getBusinessId(req);
    const access = await ModuleService.assignModuleToBusiness(
      businessId,
      req.body.moduleId,
      req.body.expiresAt,
    );
    res.status(200).json({ status: "success", data: access });
  },
);

export const createModule = catchAsync(async (req: Request, res: Response) => {
  const newModule = await ModuleService.createAppModule(req.body);
  res.status(201).json({ status: "success", data: newModule });
});

// synced
