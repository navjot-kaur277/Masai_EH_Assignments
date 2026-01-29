import express from "express";
import userRoutes from './routes/userRoutes.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
app.use(express.json());

app.use((req,res,next) => {
    console.log(`🚀${req.method} request received at ${req.url}`);
    next();
})

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

const PORT = 3001;
app.listen(PORT , () => {
    console.log(`✅ server is running at http://localhost:${PORT}`);
})