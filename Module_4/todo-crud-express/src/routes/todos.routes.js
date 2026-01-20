const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();

// Import middleware
const rateLimiterMiddleware = require("../middleware/rateLimiter.middleware");
const validateTodoMiddleware = require("../middleware/validateTodo.middleware");

const dbPath = path.join(__dirname, "..", "db.json");

// Helper function to read todos
const readTodos = async () => {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, create it
    if (error.code === "ENOENT") {
      await fs.writeFile(dbPath, "[]", "utf8");
      return [];
    }
    throw error;
  }
};

// Helper function to write todos
const writeTodos = async (todos) => {
  await fs.writeFile(dbPath, JSON.stringify(todos, null, 2), "utf8");
};

// Generate unique ID
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

// 1. GET /todos - Get all todos (with rate limiting)
router.get("/", rateLimiterMiddleware, async (req, res, next) => {
  try {
    const todos = await readTodos();
    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
});

// 2. GET /todos/:todoId - Get single todo
router.get("/:todoId", async (req, res, next) => {
  try {
    const todos = await readTodos();
    const todo = todos.find((t) => t.id === req.params.todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
});

// 3. POST /todos/add - Create todo (with validation middleware)
router.post("/add", validateTodoMiddleware, async (req, res, next) => {
  try {
    const todos = await readTodos();
    const newTodo = {
      id: generateId(),
      title: req.body.title.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    await writeTodos(todos);

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    next(error);
  }
});

// 4. PUT /todos/update/:todoId - Update todo
router.put("/update/:todoId", async (req, res, next) => {
  try {
    const todos = await readTodos();
    const todoIndex = todos.findIndex((t) => t.id === req.params.todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update todo - only allow updating title and completed status
    const updatedTodo = {
      ...todos[todoIndex],
      ...(req.body.title && { title: req.body.title.trim() }),
      ...(req.body.completed !== undefined && {
        completed: req.body.completed,
      }),
      updatedAt: new Date().toISOString(),
    };

    todos[todoIndex] = updatedTodo;
    await writeTodos(todos);

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    next(error);
  }
});

// 5. DELETE /todos/delete/:todoId - Delete todo
router.delete("/delete/:todoId", async (req, res, next) => {
  try {
    const todos = await readTodos();
    const todoIndex = todos.findIndex((t) => t.id === req.params.todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const [deletedTodo] = todos.splice(todoIndex, 1);
    await writeTodos(todos);

    res.status(200).json({
      message: "Todo deleted successfully",
      todo: deletedTodo,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
