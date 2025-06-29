import  { Router } from "express";
import { login ,register} from "../controllers/auth";
import { validateRequest } from "../middlewares/validateRequest";
import { registerSchema } from "../schema/userSchema";

const authRoutes = Router();


authRoutes.post("/login", login);

authRoutes.post("/register", validateRequest(registerSchema) ,register);



export default authRoutes;
