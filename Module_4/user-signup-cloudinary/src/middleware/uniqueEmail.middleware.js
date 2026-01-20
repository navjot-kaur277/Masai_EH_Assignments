const fs = require("fs").promises;
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

const uniqueEmailMiddleware = async (req, res, next) => {
  try {
    // Check if email is provided in request body
    if (!req.body.email) {
      return res.status(400).json({
        error: "Email is required",
      });
    }

    // Read existing users from db.json
    let users = [];
    try {
      const data = await fs.readFile(dbPath, "utf8");
      users = JSON.parse(data);
    } catch (error) {
      // If file doesn't exist or is empty, start with empty array
      if (error.code === "ENOENT") {
        await fs.writeFile(dbPath, "[]", "utf8");
        users = [];
      } else {
        throw error;
      }
    }

    // Check if email already exists
    const emailExists = users.some(
      (user) => user.email.toLowerCase() === req.body.email.toLowerCase(),
    );

    if (emailExists) {
      return res.status(409).json({
        error: "Email already exists",
      });
    }

    next();
  } catch (error) {
    console.error("Unique email middleware error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
};

module.exports = uniqueEmailMiddleware;
