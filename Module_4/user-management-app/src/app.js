const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Main Routes
app.use("/api/users", userRoutes);

// Basic Error Handling
app.use((req, res) => res.status(404).json({ message: "Endpoint not found" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
