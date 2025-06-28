import { Router } from 'express';
import prisma from '../prisma/client';

const userRouter = Router();

// GET all users
userRouter.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

// POST create user
userRouter.post('/', async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({
        data: { name, email },
    });
    res.json(user);
});

// GET user by id
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
        where: { id: (id) },
    });
    res.json(user);
});

// PUT update user
userRouter.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.user.update({
        where: { id: (id) },
        data: { name, email },
    });
    res.json(user);
});
// DELETE user
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: { id: (id) },
    });
    res.status(204).json(user);
});
export default userRouter;
