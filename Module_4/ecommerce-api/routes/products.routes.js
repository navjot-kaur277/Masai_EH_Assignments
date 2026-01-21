const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, "../db.json");

// Read database helper
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

// Write database helper
const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// GET all products
router.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json({
      success: true,
      data: db.products,
      count: db.products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// POST create product
router.post("/", (req, res) => {
  try {
    const { name, price, stock } = req.body;

    // Validation
    if (!name || !price || !stock) {
      return res.status(400).json({
        success: false,
        error: "Name, price, and stock are required",
      });
    }

    const db = readDB();

    // Create new product
    const newProduct = {
      id:
        db.products.length > 0
          ? Math.max(...db.products.map((p) => p.id)) + 1
          : 1,
      name: String(name),
      price: Number(price),
      stock: Number(stock),
    };

    db.products.push(newProduct);
    writeDB(db);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
