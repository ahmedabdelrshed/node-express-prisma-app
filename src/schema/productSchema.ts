import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    price: z.number().min(1, "Price must be at least 1"),
}) 