const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../db.json");

// Helper function to read database
const readDatabase = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

// Helper function to write to database
const writeDatabase = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// POST /todos/add - Create a new todo
router.post("/add", (req, res) => {
  try {
    const { title, description, completed = false } = req.body;

    if (!title) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    const db = readDatabase();
    const newTodo = {
      todoId: Date.now(), // Using timestamp as unique ID
      title,
      description: description || "",
      completed,
      createdAt: new Date().toISOString(),
    };

    db.todos.push(newTodo);
    writeDatabase(db);

    res.status(201).json({
      message: "Todo created successfully",
      todo: newTodo,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /todos - Get all todos
router.get("/", (req, res) => {
  try {
    const db = readDatabase();
    res.status(200).json(db.todos);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /todos/:todoId - Get single todo
router.get("/:todoId", (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const db = readDatabase();
    const todo = db.todos.find((t) => t.todoId === todoId);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /todos/update/:todoId - Update todo
router.put("/update/:todoId", (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const { title, description, completed } = req.body;

    const db = readDatabase();
    const todoIndex = db.todos.findIndex((t) => t.todoId === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    // Update todo fields if provided
    if (title !== undefined) db.todos[todoIndex].title = title;
    if (description !== undefined)
      db.todos[todoIndex].description = description;
    if (completed !== undefined) db.todos[todoIndex].completed = completed;

    writeDatabase(db);

    res.status(200).json({
      message: "Todo updated successfully",
      todo: db.todos[todoIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /todos/delete/:todoId - Delete todo
router.delete("/delete/:todoId", (req, res) => {
  try {
    const todoId = parseInt(req.params.todoId);
    const db = readDatabase();
    const todoIndex = db.todos.findIndex((t) => t.todoId === todoId);

    if (todoIndex === -1) {
      return res.status(404).json({ error: "Todo not found" });
    }

    const deletedTodo = db.todos.splice(todoIndex, 1);
    writeDatabase(db);

    res.status(200).json({
      message: "Todo deleted successfully",
      todo: deletedTodo[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
