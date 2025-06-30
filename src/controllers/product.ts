import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";
import { ERROR, FAIL } from "../utils/httpStatus";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const count = await prisma.product.count();
        const products = await prisma.product.findMany({
            skip: +req.query.skip! || 0,
            take: 4
        });
        res.json({ count, data: products });
    } catch (error) {
        return next(new AppError("Error fetching products", 400, FAIL))
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.create({
            data: req.body
        });
        res.json(product);
    } catch (error) {
        return next(new AppError("Error Creating product", 400, FAIL))
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });
        res.json(product);

    } catch (error) {
        return next(new AppError("Product not found", 404, ERROR))
    }
}


export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.delete({
            where: {
                id: req.params.id
            }
        });
        res.json(product);
    } catch (error) {
        return next(new AppError("Product not found", 404, ERROR))
    }
}

export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const product = await prisma.product.findFirstOrThrow({
            where: {
                id: req.params.id
            }
        });
        res.json(product);
    } catch (error) {
        return next(new AppError("Product not found", 404, ERROR))
    }
}