import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3,"Name must be at least 3 characters long"),
    email: z.string().email(),
    password: z.string().min(8).regex(/[a-z]/, 'Must contain lowercase')
        .regex(/[A-Z]/, 'Must contain uppercase')
        .regex(/[0-9]/, 'Must contain number')
        .regex(/[^A-Za-z0-9]/, 'Must contain special character'),
});