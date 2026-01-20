const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const router = express.Router();

// Import middleware
const uploadMiddleware = require("../middleware/upload.middleware");
const uniqueEmailMiddleware = require("../middleware/uniqueEmail.middleware");
const { uploadToCloudinary } = require("../config/cloudinary.config");

const dbPath = path.join(__dirname, "..", "db.json");

// Helper function to generate unique ID
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Helper function to read users from db.json
const readUsers = async () => {
  try {
    const data = await fs.readFile(dbPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await fs.writeFile(dbPath, "[]", "utf8");
      return [];
    }
    throw error;
  }
};

// Helper function to write users to db.json
const writeUsers = async (users) => {
  await fs.writeFile(dbPath, JSON.stringify(users, null, 2), "utf8");
};

// POST /users/signup - User signup with profile upload
router.post(
  "/signup",
  uploadMiddleware, // Multer middleware for file upload
  uniqueEmailMiddleware, // Custom middleware for unique email check
  async (req, res) => {
    try {
      // Validate required fields
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: "All fields (name, email, password) are required",
        });
      }

      // Validate email format (basic validation)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          error: "Invalid email format",
        });
      }

      // Validate password length
      if (password.length < 6) {
        return res.status(400).json({
          error: "Password must be at least 6 characters long",
        });
      }

      // Upload image to Cloudinary
      const cloudinaryResult = await uploadToCloudinary(req.file);

      if (!cloudinaryResult.success) {
        return res.status(500).json({
          error: "Failed to upload profile image",
          message: cloudinaryResult.error,
        });
      }

      // Read existing users
      const users = await readUsers();

      // Create new user object
      const newUser = {
        id: generateId(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password, // In real app, hash this password!
        profilePic: cloudinaryResult.url,
        profilePicPublicId: cloudinaryResult.public_id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add new user to array
      users.push(newUser);

      // Write updated users to db.json
      await writeUsers(users);

      // Prepare response (exclude password and publicId)
      const userResponse = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
      };

      res.status(201).json({
        message: "User registered successfully",
        user: userResponse,
      });
    } catch (error) {
      console.error("Signup error:", error);

      // If Cloudinary upload succeeded but db write failed,
      // we should delete the uploaded image from Cloudinary
      // (This is advanced error handling)

      res.status(500).json({
        error: "Failed to register user",
        message: error.message,
      });
    }
  },
);

// GET /users - Get all users (for testing, remove in production)
router.get("/", async (req, res) => {
  try {
    const users = await readUsers();

    // Remove passwords from response
    const safeUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    }));

    res.status(200).json({
      count: safeUsers.length,
      users: safeUsers,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      error: "Failed to fetch users",
      message: error.message,
    });
  }
});

module.exports = router;
