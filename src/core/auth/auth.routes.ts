import { Router } from "express";
import { register, login, refresh } from "./auth.controller";
import { validateRequest } from "../../shared/middlewares/validateRequest";
import { registerSchema, loginSchema } from "./auth.schema";
import { authLimiter } from "../../shared/middlewares/rateLimiter";

const router = Router();

router.use(authLimiter);

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);
router.post("/refresh", refresh);

export const authRouter = router;

// synced
