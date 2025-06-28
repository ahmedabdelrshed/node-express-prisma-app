import { Request, Response } from "express";
import prisma from "../prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let user = await prisma.user.findFirst({
        where: {
            email,
        }, select: {
            id: true,
            email: true,
            name: true,
            password: true
        }
    })
    if (!user) {
        throw Error("Email or password are not correct")
    }
    if (!compareSync(password, user.password)) {
        throw Error("Email or password are not correct")
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: "1d" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
}

export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    let user = await prisma.user.findFirst({
        where: {
            email,
        }
    })
    if (user) {
        throw Error("User already exists");
        //  res.status(400).json({ message: "User already exists" });
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