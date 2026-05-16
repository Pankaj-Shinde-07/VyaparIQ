import { Router } from "express";
import { getMe, updateMe } from "./users.controller";
import { requireAuth } from "../../shared/middlewares/requireAuth";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import { updateMeSchema } from "./users.schema";

const router = Router();

router.use(requireAuth);

router.get("/me", getMe);
router.patch("/me", validateRequest(updateMeSchema), updateMe);

export const userRouter = router;

// synced
