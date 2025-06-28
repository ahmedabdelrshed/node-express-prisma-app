import  { Router } from "express";
import authRoutes from "./authRoutes";

const rootRoutes: Router = Router();

rootRoutes.use('/auth', authRoutes)

export default rootRoutes;