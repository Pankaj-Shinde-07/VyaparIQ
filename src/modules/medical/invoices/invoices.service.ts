import { prisma } from "../../../database/client";
import { AppError } from "../../../shared/utils/AppError";

export class InvoiceService {
  static async createInvoice(businessId: string, data: any) {
    let subtotal = 0;
    const itemsData = [];

    for (const item of data.items) {
      const product = await prisma.product.findFirst({
        where: { id: item.productId, businessId },
      });
      if (!product) {
        throw new AppError(`Product with ID ${item.productId} not found`, 404);
      }

      const total = item.quantity * item.unitPrice;
      subtotal += total;

      itemsData.push({
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        total,
        productId: item.productId,
      });
    }

    const taxTotal = data.taxTotal || 0;
    const discountTotal = data.discountTotal || 0;
    const total = subtotal + taxTotal - discountTotal;

    const count = await prisma.invoice.count({ where: { businessId } });
    const invoiceNumber = `INV-${new Date().toISOString().slice(2, 10).replace(/-/g, "")}-${(count + 1).toString().padStart(4, "0")}`;

    const invoice = await prisma.$transaction(async (tx) => {
      const newInvoice = await tx.invoice.create({
        data: {
          invoiceNumber,
          businessId,
          customerId: data.customerId,
          issueDate: data.issueDate ? new Date(data.issueDate) : new Date(),
          dueDate: data.dueDate ? new Date(data.dueDate) : null,
          subtotal,
          taxTotal,
          discountTotal,
          total,
          status: "DRAFT",
          items: {
            create: itemsData,
          },
        },
        include: {
          items: true,
          customer: true,
        },
      });

      return newInvoice;
    });

    return invoice;
  }

  static async getInvoicesByBusiness(businessId: string, query: any) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const invoices = await prisma.invoice.findMany({
      where: { businessId },
      include: {
        customer: true,
      },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.invoice.count({ where: { businessId } });

    return {
      invoices,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getInvoiceById(businessId: string, invoiceId: string) {
    const invoice = await prisma.invoice.findFirst({
      where: { id: invoiceId, businessId },
      include: {
        items: { include: { product: true } },
        customer: true,
      },
    });

    if (!invoice) throw new AppError("Invoice not found", 404);
    return invoice;
  }

  static async updateInvoiceStatus(
    businessId: string,
    invoiceId: string,
    status: any,
  ) {
    const invoice = await prisma.invoice.update({
      where: { id: invoiceId, businessId },
      data: { status },
    });
    return invoice;
  }
}

// synced
