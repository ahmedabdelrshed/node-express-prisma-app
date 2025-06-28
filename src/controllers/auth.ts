import { Request, Response } from "express";
import prisma from "../prisma/client";

import { hashSync } from "bcrypt";
export const login = async (req: Request, res: Response) => {
    res.send("Login endpoint not implemented yet");
}

export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    let user = await prisma.user.findFirst({
        where: {
            email,
        }
    })
    if (user) {
         res.status(400).json({ message: "User already exists" });
    }
    user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashSync(password, 10),
        }
    })
    res.json(user);
}