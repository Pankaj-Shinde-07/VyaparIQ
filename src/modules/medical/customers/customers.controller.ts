import { Request, Response } from "express";
import { CustomerService } from "./customers.service";
import { UserService } from "../../../core/users/users.service";
import { catchAsync } from "../../../shared/utils/catchAsync";
import { AppError } from "../../../shared/utils/AppError";

const getBusinessId = async (req: Request) => {
  const userId = (req as any).user.userId;
  const user = await UserService.getUserById(userId);
  if (!user.businessId)
    throw new AppError("User does not have a business", 400);
  return user.businessId;
};

export const createCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const businessId = await getBusinessId(req);
    const customer = await CustomerService.createCustomer(businessId, req.body);
    res.status(201).json({ status: "success", data: customer });
  },
);

export const getCustomers = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const customers = await CustomerService.getCustomers(businessId);
  res.status(200).json({ status: "success", data: customers });
});

export const getCustomer = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const customer = await CustomerService.getCustomerById(
    businessId,
    req.params.id,
  );
  res.status(200).json({ status: "success", data: customer });
});

export const updateCustomer = catchAsync(
  async (req: Request, res: Response) => {
    const businessId = await getBusinessId(req);
    const customer = await CustomerService.updateCustomer(
      businessId,
      req.params.id,
      req.body,
    );
    res.status(200).json({ status: "success", data: customer });
  },
);

// synced
