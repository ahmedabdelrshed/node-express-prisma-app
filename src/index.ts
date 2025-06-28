import express from 'express';
import userRouter from './routes/userRoutes';
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/api/users', userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
