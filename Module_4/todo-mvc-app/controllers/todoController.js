import { TodoModel } from "../models/todoModel.js";

export const getTodos = (req,res) => {
    try {
        const todos = TodoModel.getALl();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json ({message:"Error fetching todos", error : error.message});
    }
};

export const createTodo = (req,res) => {
    try {
        const {task} = req.body;
        if (!task) {
            return res.status(400).json({message : "Task content is required"});
        }
        const newTodo = TodoModel.create(task);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({message : "Error creating todo"});
    }
};

export const deleteTodo = (req,res) => {
    try {
        const success = TodoModel.delete(req.params.id);
        if (!success) {
            return res.status(404).json ({message : "Todo not found"});
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message:"Error deleting todo"});
    }
};