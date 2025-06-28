import express, { Express, Request, Response } from 'express';
import userRouter from './routes/userRoutes';
import { PORT } from './secrets';
const app: Express = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});


app.use('/api/users', userRouter);



app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
