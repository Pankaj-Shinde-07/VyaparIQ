import { Request, Response } from "express";
import { InvoiceService } from "./invoices.service";
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

export const createInvoice = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const invoice = await InvoiceService.createInvoice(businessId, req.body);

  res.status(201).json({
    status: "success",
    data: invoice,
  });
});

export const getInvoices = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const result = await InvoiceService.getInvoicesByBusiness(
    businessId,
    req.query,
  );

  res.status(200).json({
    status: "success",
    data: result,
  });
});

export const getInvoice = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const invoice = await InvoiceService.getInvoiceById(
    businessId,
    req.params.id,
  );

  res.status(200).json({
    status: "success",
    data: invoice,
  });
});

export const updateInvoiceStatus = catchAsync(
  async (req: Request, res: Response) => {
    const businessId = await getBusinessId(req);
    const invoice = await InvoiceService.updateInvoiceStatus(
      businessId,
      req.params.id,
      req.body.status,
    );

    res.status(200).json({
      status: "success",
      data: invoice,
    });
  },
);

// synced
