import { prisma } from "../../database/client.js";
import { AppError } from "../../shared/utils/AppError.js";

export class BusinessService {
  static async createBusiness(data: any, userId: string) {
    const business = await prisma.business.create({
      data,
    });

    // Update user to link to this business and set role
    await prisma.user.update({
      where: { id: userId },
      data: {
        businessId: business.id,
        role: "BUSINESS_OWNER",
      },
    });

    return business;
  }

  static async getBusinessById(businessId: string) {
    const business = await prisma.business.findUnique({
      where: { id: businessId },
    });
    if (!business) {
      throw new AppError("Business not found", 404);
    }
    return business;
  }

  static async updateBusiness(businessId: string, data: any) {
    const business = await prisma.business.update({
      where: { id: businessId },
      data,
    });
    return business;
  }
}

// synced
