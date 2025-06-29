import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { AppError } from "../utils/AppError";
import { ERROR } from "../utils/httpStatus";
export const login = async (req: Request, res: Response,next:NextFunction) => {
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
        return next (new AppError("Email or password are not correct",400,ERROR))
    }
    if (!compareSync(password, user.password)) {
        return next(new AppError("Email or password are not correct", 400, ERROR))
    }
    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, { expiresIn: "1d" });
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body;
    let user = await prisma.user.findFirst({
        where: {
            email,
        }
    })
    if (user) {
        return next(new AppError("Email already exists", 400, ERROR))
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