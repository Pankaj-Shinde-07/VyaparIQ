import { Router } from "express";
import {
  createBusiness,
  getMyBusiness,
  updateMyBusiness,
} from "./businesses.controller";
import { requireAuth } from "../../shared/middlewares/requireAuth";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import {
  createBusinessSchema,
  updateBusinessSchema,
} from "./businesses.schema";

const router = Router();

router.use(requireAuth);

router.post("/", validateRequest(createBusinessSchema), createBusiness);
router.get("/me", getMyBusiness);
router.patch("/me", validateRequest(updateBusinessSchema), updateMyBusiness);

export const businessRouter = router;

// synced
