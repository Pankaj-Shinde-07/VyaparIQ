import { Request, Response } from "express";
import { ProductService } from "./products.service";
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

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const product = await ProductService.createProduct(businessId, req.body);
  res.status(201).json({ status: "success", data: product });
});

export const getProducts = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const products = await ProductService.getProducts(businessId, req.query);
  res.status(200).json({ status: "success", data: products });
});

export const getProduct = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const product = await ProductService.getProductById(
    businessId,
    req.params.id,
  );
  res.status(200).json({ status: "success", data: product });
});

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const businessId = await getBusinessId(req);
  const product = await ProductService.updateProduct(
    businessId,
    req.params.id,
    req.body,
  );
  res.status(200).json({ status: "success", data: product });
});

// synced
