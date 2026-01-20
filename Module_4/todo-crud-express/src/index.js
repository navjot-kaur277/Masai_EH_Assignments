const express = require("express");
const loggerMiddleware = require("./middleware/logger.middleware");
const todosRouter = require("./routes/todos.routes");

const app = express();
const PORT = 3000;

// 1. Use express.json() middleware for parsing JSON bodies
app.use(express.json());

// 2. Apply App-Level Middleware (Logger)
app.use(loggerMiddleware);

// 3. Use Todo Router for /todos routes
app.use("/todos", todosRouter);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Todo API is running with Express 5",
    endpoints: {
      getTodos: "GET /todos",
      getTodo: "GET /todos/:id",
      createTodo: "POST /todos/add",
      updateTodo: "PUT /todos/update/:id",
      deleteTodo: "DELETE /todos/delete/:id",
    },
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Using Express ${require("express/package.json").version}`);
});
