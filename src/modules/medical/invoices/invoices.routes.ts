import { Router } from "express";
import {
  createInvoice,
  getInvoices,
  getInvoice,
  updateInvoiceStatus,
} from "./invoices.controller";
import { requireAuth } from "../../../shared/middlewares/requireAuth";
import { validateRequest } from "../../../shared/middlewares/validateRequest";
import { requireModuleAccess } from "../../../shared/middlewares/requireModuleAccess";
import {
  createInvoiceSchema,
  updateInvoiceStatusSchema,
} from "./invoices.schema";

const router = Router();

router.use(requireAuth);
router.use(requireModuleAccess("MEDICAL"));

router.post("/", validateRequest(createInvoiceSchema), createInvoice);
router.get("/", getInvoices);
router.get("/:id", getInvoice);
router.patch(
  "/:id/status",
  validateRequest(updateInvoiceStatusSchema),
  updateInvoiceStatus,
);

export const invoiceRouter = router;

// synced
