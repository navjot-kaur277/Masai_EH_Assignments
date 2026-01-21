import express from "express";
import { getTodos,createTodo,deleteTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get('/', getTodos);
router.post('/',createTodo);
router.delete('/',deleteTodo);

export default router;