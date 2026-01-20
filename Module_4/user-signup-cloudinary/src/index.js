require("dotenv").config();
const express = require("express");
const usersRouter = require("./routes/users.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON
app.use(express.json());

// Logging middleware for all requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Use users router
app.use("/users", usersRouter);

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "User Signup API with Cloudinary Upload",
    endpoints: {
      signup: "POST /users/signup (multipart/form-data)",
      fields: "name, email, password, profile",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Handle multer errors
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      error: "File too large. Maximum size is 2MB",
    });
  }

  if (err.code === "LIMIT_FILE_TYPE") {
    return res.status(400).json({
      error: "Invalid file type. Only images are allowed",
    });
  }

  res.status(err.status || 500).json({
    error: "Internal server error",
    message: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
