const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dbPath = path.join(__dirname, "../db.json");

const readDB = () => {
  const data = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(data);
};

// 1. All Orders with Count (using forEach)
router.get("/allorders", (req, res) => {
  try {
    const db = readDB();
    let count = 0;
    const orders = [];

    db.orders.forEach((order) => {
      orders.push(order);
      count++;
    });

    res.json({
      success: true,
      count,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// 2. Cancelled Orders (using filter)
router.get("/cancelled-orders", (req, res) => {
  try {
    const db = readDB();
    const cancelledOrders = db.orders.filter(
      (order) => order.status === "cancelled",
    );

    res.json({
      success: true,
      count: cancelledOrders.length,
      data: cancelledOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// 3. Shipped Orders (using filter)
router.get("/shipped", (req, res) => {
  try {
    const db = readDB();
    const shippedOrders = db.orders.filter(
      (order) => order.status === "shipped",
    );

    res.json({
      success: true,
      count: shippedOrders.length,
      data: shippedOrders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// 4. Total Revenue by Product (using filter and reduce)
router.get("/total-revenue/:productId", (req, res) => {
  try {
    const productId = parseInt(req.params.productId);
    const db = readDB();

    // Find product
    const product = db.products.find((p) => p.id === productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // Filter orders for this product (excluding cancelled)
    const productOrders = db.orders.filter(
      (order) => order.productId === productId && order.status !== "cancelled",
    );

    // Calculate total revenue using reduce
    const totalRevenue = productOrders.reduce((total, order) => {
      return total + order.quantity * product.price;
    }, 0);

    res.json({
      success: true,
      productId,
      productName: product.name,
      totalRevenue,
      orderCount: productOrders.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

// 5. Overall Revenue (using filter and reduce)
router.get("/alltotalrevenue", (req, res) => {
  try {
    const db = readDB();

    // Filter out cancelled orders
    const validOrders = db.orders.filter(
      (order) => order.status !== "cancelled",
    );

    // Calculate total revenue using reduce
    const totalRevenue = validOrders.reduce((total, order) => {
      const product = db.products.find((p) => p.id === order.productId);
      return total + order.quantity * (product ? product.price : 0);
    }, 0);

    res.json({
      success: true,
      totalRevenue,
      orderCount: validOrders.length,
      averageRevenue:
        validOrders.length > 0 ? totalRevenue / validOrders.length : 0,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});

module.exports = router;
