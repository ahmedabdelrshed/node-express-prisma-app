import express, { Express, Request, Response } from 'express';
import userRouter from './routes/userRoutes';
import { PORT } from './secrets';
import rootRoutes from './routes';
const app: Express = express();

app.use(express.json());

app.use('/api',rootRoutes)


app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
