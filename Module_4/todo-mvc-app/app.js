import express from 'express';
import todoRoutes from './routes/todoRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/todos', todoRoutes);

app.use((req,res) => {
    res.status(404).json({message : "Route not found"});
});

app.listen(PORT , () => {
    console.log(`Server running at https://localhost:${PORT}`);
});