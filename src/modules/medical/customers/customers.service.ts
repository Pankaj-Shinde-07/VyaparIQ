import { prisma } from "../../../database/client.js";
import { AppError } from "../../../shared/utils/AppError.js";

export class CustomerService {
  static async createCustomer(businessId: string, data: any) {
    const customer = await prisma.customer.create({
      data: {
        ...data,
        businessId,
      },
    });
    return customer;
  }

  static async getCustomers(businessId: string) {
    const customers = await prisma.customer.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
    });
    return customers;
  }

  static async getCustomerById(businessId: string, customerId: string) {
    const customer = await prisma.customer.findFirst({
      where: { id: customerId, businessId },
    });
    if (!customer) throw new AppError("Customer not found", 404);
    return customer;
  }

  static async updateCustomer(
    businessId: string,
    customerId: string,
    data: any,
  ) {
    const customer = await prisma.customer.update({
      where: { id: customerId, businessId },
      data,
    });
    return customer;
  }
}

// synced
