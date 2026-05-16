import { Router } from "express";
import {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
} from "./customers.controller";
import { requireAuth } from "../../../shared/middlewares/requireAuth.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireModuleAccess } from "../../../shared/middlewares/requireModuleAccess.js";
import { createCustomerSchema, updateCustomerSchema } from "./customers.schema.js";

const router = Router();

router.use(requireAuth);
router.use(requireModuleAccess("MEDICAL"));

router.post("/", validateRequest(createCustomerSchema), createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.patch("/:id", validateRequest(updateCustomerSchema), updateCustomer);

export const customerRouter = router;

// synced
