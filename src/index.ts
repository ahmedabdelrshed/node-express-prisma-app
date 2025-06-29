import express, {  Express } from 'express';
import userRouter from './routes/userRoutes';
import { PORT } from './secrets';
import rootRoutes from './routes';
import { errorHandler } from './middlewares/errorHandler';
const app: Express = express();

app.use(express.json());

app.use('/api', rootRoutes)

app.use(errorHandler);   
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
