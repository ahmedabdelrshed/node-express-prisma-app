import { Router } from "express";
import authRoutes from "./authRoutes";
import productRouter from "./productRoutes";

const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes)
rootRoutes.use('/product', productRouter)

export default rootRoutes;