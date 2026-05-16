import { Router } from "express";
import { register, login, refresh } from "./auth.controller.js";
import { validateRequest } from "../../shared/middlewares/validateRequest.js";
import { registerSchema, loginSchema } from "./auth.schema.js";
import { authLimiter } from "../../shared/middlewares/rateLimiter.js";

const router = Router();

router.use(authLimiter);

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/refresh", refresh);

export const authRouter = router;

// synced
