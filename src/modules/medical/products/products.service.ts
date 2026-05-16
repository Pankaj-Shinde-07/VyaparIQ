import { prisma } from "../../../database/client";
import { AppError } from "../../../shared/utils/AppError";

export class ProductService {
  static async createProduct(businessId: string, data: any) {
    const product = await prisma.product.create({
      data: {
        ...data,
        businessId,
      },
    });
    return product;
  }

  static async getProducts(businessId: string, query: any) {
    const products = await prisma.product.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });
    return products;
  }

  static async getProductById(businessId: string, productId: string) {
    const product = await prisma.product.findFirst({
      where: { id: productId, businessId },
    });
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  static async updateProduct(businessId: string, productId: string, data: any) {
    const product = await prisma.product.update({
      where: { id: productId, businessId },
      data,
    });
    return product;
  }
}

// synced
