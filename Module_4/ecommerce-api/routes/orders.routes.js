const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, "../db.json");

// Helper functions
const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

const writeDB = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().split("T")[0];
};

// GET all orders
router.get("/", (req, res) => {
  try {
    const db = readDB();
    res.json({
      success: true,
      data: db.orders,
      count: db.orders.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// POST create order
router.post("/", (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({
        success: false,
        error: "productId and quantity are required",
      });
    }

    const db = readDB();
    const product = db.products.find((p) => p.id === parseInt(productId));

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    if (product.stock < 1) {
      return res.status(400).json({
        success: false,
        error: "Product out of stock",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        error: `Insufficient stock. Available: ${product.stock}`,
        available: product.stock,
      });
    }

    // Calculate total amount
    const totalAmount = product.price * quantity;

    // Create order
    const newOrder = {
      id:
        db.orders.length > 0 ? Math.max(...db.orders.map((o) => o.id)) + 1 : 1,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
      totalAmount,
      status: "placed",
      createdAt: getCurrentDate(),
    };

    // Update product stock
    product.stock -= quantity;

    // Save to database
    db.orders.push(newOrder);
    writeDB(db);

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// DELETE cancel order
router.delete("/:orderId", (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const db = readDB();

    const order = db.orders.find((o) => o.id === orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    if (order.status === "cancelled") {
      return res.status(400).json({
        success: false,
        error: "Order is already cancelled",
      });
    }

    if (order.createdAt !== getCurrentDate()) {
      return res.status(400).json({
        success: false,
        error: "Order can only be cancelled on the same day",
        orderDate: order.createdAt,
      });
    }

    // Find product and revert stock
    const product = db.products.find((p) => p.id === order.productId);
    if (product) {
      product.stock += order.quantity;
    }

    // Update order status
    order.status = "cancelled";
    writeDB(db);

    res.json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// PATCH change order status
router.patch("/change-status/:orderId", (req, res) => {
  try {
    const orderId = parseInt(req.params.orderId);
    const { status } = req.body;

    if (!status || !["shipped", "delivered"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Status must be either "shipped" or "delivered"',
      });
    }

    const db = readDB();
    const order = db.orders.find((o) => o.id === orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    // Valid status transitions
    const validTransitions = {
      placed: ["shipped"],
      shipped: ["delivered"],
      delivered: [],
      cancelled: [],
    };

    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({
        success: false,
        error: `Cannot change status from ${order.status} to ${status}`,
      });
    }

    order.status = status;
    writeDB(db);

    res.json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
