import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "./products.controller";
import { requireAuth } from "../../../shared/middlewares/requireAuth.js";
import { validateRequest } from "../../../shared/middlewares/validateRequest.js";
import { requireModuleAccess } from "../../../shared/middlewares/requireModuleAccess.js";
import { createProductSchema, updateProductSchema } from "./products.schema.js";

const router = Router();

router.use(requireAuth);
router.use(requireModuleAccess("MEDICAL"));

router.post("/", validateRequest(createProductSchema), createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", validateRequest(updateProductSchema), updateProduct);

export const productRouter = router;

// synced
