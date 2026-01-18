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

// POST /users/add - Create a new user
router.post("/add", (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required",
      });
    }

    const db = readDatabase();
    const newUser = {
      userId: Date.now(), // Using timestamp as unique ID
      name,
      email,
    };

    db.users.push(newUser);
    writeDatabase(db);

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /users - Get all users
router.get("/", (req, res) => {
  try {
    const db = readDatabase();
    res.status(200).json(db.users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /users/:userId - Get single user
router.get("/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = readDatabase();
    const user = db.users.find((u) => u.userId === userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT /users/update/:userId - Update user
router.put("/update/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { name, email } = req.body;

    if (!name && !email) {
      return res.status(400).json({
        error: "At least one field (name or email) is required to update",
      });
    }

    const db = readDatabase();
    const userIndex = db.users.findIndex((u) => u.userId === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    if (name) db.users[userIndex].name = name;
    if (email) db.users[userIndex].email = email;

    writeDatabase(db);

    res.status(200).json({
      message: "User updated successfully",
      user: db.users[userIndex],
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /users/delete/:userId - Delete user
router.delete("/delete/:userId", (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const db = readDatabase();
    const userIndex = db.users.findIndex((u) => u.userId === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = db.users.splice(userIndex, 1);
    writeDatabase(db);

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser[0],
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
