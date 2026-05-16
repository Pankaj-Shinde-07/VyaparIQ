import { Router } from "express";
import { authRouter } from "../core/auth/auth.routes";
import { userRouter } from "../core/users/users.routes";
import { businessRouter } from "../core/businesses/businesses.routes";
import { moduleRouter } from "../core/modules/modules.routes";
import { productRouter } from "../modules/medical/products/products.routes";
import { customerRouter } from "../modules/medical/customers/customers.routes";
import { invoiceRouter } from "../modules/medical/invoices/invoices.routes";

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
