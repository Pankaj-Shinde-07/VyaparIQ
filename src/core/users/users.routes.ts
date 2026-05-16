import { Router } from "express";
import { getMe, updateMe } from "./users.controller.js";
import { requireAuth } from "../../shared/middlewares/requireAuth.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { updateMeSchema } from "./users.schema.js";

const router = Router();

router.use(requireAuth);

router.get("/me", getMe);
router.patch("/me", validateRequest(updateMeSchema), updateMe);

export const userRouter = router;

// synced
