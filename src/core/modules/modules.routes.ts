import { Router } from "express";
import {
  listAvailableModules,
  listMyModules,
  subscribeToModule,
  createModule,
} from "./modules.controller";
import { requireAuth } from "../../shared/middlewares/requireAuth";
import { requireRoles } from "../../shared/middlewares/requireRole";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import { assignModuleSchema, createModuleSchema } from "./modules.schema";

const router = Router();

router.use(requireAuth);

router.get("/available", listAvailableModules);
router.get("/me", listMyModules);

// Business owner subscribing to a module
router.post(
  "/subscribe",
  requireRoles("BUSINESS_OWNER", "SUPER_ADMIN"),
  validateRequest(assignModuleSchema),
  subscribeToModule,
);

// Admin only operations
router.post(
  "/",
  requireRoles("SUPER_ADMIN"),
  validateRequest(createModuleSchema),
  createModule,
);

export const moduleRouter = router;

// synced
