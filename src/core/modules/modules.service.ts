import { prisma } from "../../database/client.js";
import { AppError } from "../../shared/utils/AppError.js";

export class ModuleService {
  static async getAvailableModules() {
    return prisma.appModule.findMany({
      where: { isActive: true },
    });
  }

  static async createAppModule(data: any) {
    return prisma.appModule.create({ data });
  }

  static async getBusinessModules(businessId: string) {
    const access = await prisma.tenantModuleAccess.findMany({
      where: {
        businessId,
        isActive: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: {
        module: true,
      },
    });

    return access.map((a) => a.module);
  }

  static async assignModuleToBusiness(
    businessId: string,
    moduleId: string,
    expiresAt?: string,
  ) {
    const appModule = await prisma.appModule.findUnique({
      where: { id: moduleId },
    });
    if (!appModule) {
      throw new AppError("Module not found", 404);
    }

    const access = await prisma.tenantModuleAccess.upsert({
      where: {
        businessId_moduleId: {
          businessId,
          moduleId,
        },
      },
      update: {
        isActive: true,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      create: {
        businessId,
        moduleId,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return access;
  }
}

// synced
