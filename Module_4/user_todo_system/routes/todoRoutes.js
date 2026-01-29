import express from "express";
import { addTodo, getMyTodo, updateTodo, deleteTodo } from "../controllers/todosController.js";

const router = express.Router();

router.post('/add-todo' , addTodo);
router.get('/get-my-todo/:userId' , getMyTodo);
router.put('/update-todo/:todoId', updateTodo);
router.delete('/delete-todo/:todoId', deleteTodo);

router.post('/test', (req, res) => res.send("Todo route is working!"));

export default router;