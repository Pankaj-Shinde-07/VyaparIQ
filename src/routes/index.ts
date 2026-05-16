import { Router } from "express";
import { authRouter } from "../core/auth/auth.routes.js";
import { userRouter } from "../core/users/users.routes.js";
import { businessRouter } from "../core/businesses/businesses.routes.js";
import { moduleRouter } from "../core/modules/modules.routes.js";
import { productRouter } from "../modules/medical/products/products.routes.js";
import { customerRouter } from "../modules/medical/customers/customers.routes.js";
import { invoiceRouter } from "../modules/medical/invoices/invoices.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/businesses", businessRouter);
router.use("/modules", moduleRouter);
router.use("/products", productRouter);
router.use("/customers", customerRouter);
router.use("/invoices", invoiceRouter);

export const apiRouter = router;

// synced
