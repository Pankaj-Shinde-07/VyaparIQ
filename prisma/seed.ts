import { prisma } from '../src/database/client';
import bcrypt from "bcrypt";

async function main() {
  console.log('Seeding initial data...');

  const modules = [
    {
      code: 'MEDICAL',
      name: 'Medical Store Management',
      description: 'Complete suite for medical stores including inventory, batch tracking, and billing.',
      pricePerMonth: 0, 
    },
    {
      code: 'KIRANA',
      name: 'Kirana POS',
      description: 'Point of sale and inventory management tailored for Kirana stores.',
      pricePerMonth: 0,
    },
    {
      code: 'AGRICULTURE',
      name: 'Agri Business Manager',
      description: 'Manage agricultural products, fertilizers, and farmer accounts.',
      pricePerMonth: 0,
    }
  ];

  for (const mod of modules) {
    await prisma.appModule.upsert({
      where: { code: mod.code },
      update: mod,
      create: mod,
    });
  }

  console.log("Seeding Demo Business...");

  const medicalModule = await prisma.appModule.findUnique({ where: { code: 'MEDICAL' } });
  
  // Create Demo Business
  const demoBusiness = await prisma.business.upsert({
    where: { gstin: "27AADCS1234E1Zq" },
    update: {},
    create: {
      name: "Sanjeevani Medico & General Store",
      type: "MEDICAL",
      phone: "9876543210",
      email: "hello@sanjeevanimedico.in",
      address: "Shop No 4, Main Market Road, Pune, Maharashtra",
      gstin: "27AADCS1234E1Zq",
    }
  });

  if (medicalModule) {
    // Upsert logic for tenant module access is tricky without unique compound, so check first
    const existingAccess = await prisma.tenantModuleAccess.findFirst({
      where: { businessId: demoBusiness.id, moduleId: medicalModule.id }
    });
    if (!existingAccess) {
      await prisma.tenantModuleAccess.create({
        data: { businessId: demoBusiness.id, moduleId: medicalModule.id }
      });
    }
  }

  const existingSub = await prisma.subscription.findFirst({
    where: { businessId: demoBusiness.id }
  });
  if (!existingSub) {
    await prisma.subscription.create({
      data: { businessId: demoBusiness.id, tier: 'PRO' }
    });
  }

  const passwordHash = await bcrypt.hash("Demo123!", 10);

  // 3. Users for this business
  await prisma.user.upsert({
    where: { email: "demo@sanjeevani.local" },
    update: {},
    create: {
      email: "demo@sanjeevani.local",
      password: passwordHash,
      firstName: "Rajesh",
      lastName: "Sharma",
      role: "BUSINESS_OWNER",
      businessId: demoBusiness.id,
      isEmailVerified: true
    }
  });

  // 4. Products (Medicines)
  const products = [
    { name: "Dolo 650 Tablet", price: 30.50, stock: 150, sku: "MED-001" },
    { name: "Azithral 500 Tablet", price: 119.00, stock: 45, sku: "MED-002" },
    { name: "Calpol 250 Peadiatric Drops", price: 45.00, stock: 30, sku: "MED-003" },
    { name: "Volini Pain Relief Gel 30g", price: 115.00, stock: 25, sku: "MED-004" },
    { name: "Vicks Action 500", price: 40.00, stock: 200, sku: "MED-005" },
  ];

  // For products, upsert by SKU if sku is unique, but let's check findFirst since SKU might not be marked unique in schema
  const dbProducts = await Promise.all(
    products.map(async p => {
      let existing = await prisma.product.findFirst({ where: { sku: p.sku, businessId: demoBusiness.id } });
      if (existing) return existing;
      return prisma.product.create({
        data: { ...p, businessId: demoBusiness.id }
      });
    })
  );

  // 5. Customers
  let customer1 = await prisma.customer.findFirst({ where: { phone: "9823098230", businessId: demoBusiness.id } });
  if (!customer1) {
    customer1 = await prisma.customer.create({
      data: {
        name: "Amit Desai",
        phone: "9823098230",
        businessId: demoBusiness.id,
      }
    });
  }

  let customer2 = await prisma.customer.findFirst({ where: { phone: "8888012345", businessId: demoBusiness.id } });
  if (!customer2) {
    customer2 = await prisma.customer.create({
      data: {
        name: "Sneha Kulkarni",
        phone: "8888012345",
        businessId: demoBusiness.id,
      }
    });
  }

  // 6. Invoices
  const existingInv1 = await prisma.invoice.findFirst({ where: { invoiceNumber: "INV-2024-001" } });
  if (!existingInv1) {
    await prisma.invoice.create({
      data: {
        invoiceNumber: "INV-2024-001",
        status: "PAID",
        businessId: demoBusiness.id,
        customerId: customer1.id,
        subtotal: 149.50,
        total: 149.50,
        items: {
          create: [
            { productId: dbProducts[0].id, quantity: 1, unitPrice: 30.50, total: 30.50 },
            { productId: dbProducts[1].id, quantity: 1, unitPrice: 119.00, total: 119.00 }
          ]
        }
      }
    });
  }

  const existingInv2 = await prisma.invoice.findFirst({ where: { invoiceNumber: "INV-2024-002" } });
  if (!existingInv2) {
    await prisma.invoice.create({
      data: {
        invoiceNumber: "INV-2024-002",
        status: "ISSUED",
        businessId: demoBusiness.id,
        customerId: customer2.id,
        subtotal: 230.00,
        total: 230.00,
        items: {
          create: [
            { productId: dbProducts[3].id, quantity: 2, unitPrice: 115.00, total: 230.00 },
          ]
        }
      }
    });
  }

  console.log('Seeding finished.');
  console.log('Demo Account: demo@sanjeevani.local / Demo123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
