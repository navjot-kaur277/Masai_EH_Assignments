const express = require("express");
const router = express.Router();

router.get("/allorders", (req, res) => {
  const db = req.app.locals.readDB();
  let count = 0;

  db.orders.forEach(() => {
    count++;
  });

  const ordersList = db.orders.map((order) => order);

  res.json({
    count,
    orders: ordersList,
  });
});

router.get("/cancelled-orders", (req, res) => {
  const db = req.app.locals.readDB();

  const cancelledOrders = db.orders.filter(
    (order) => order.status === "cancelled",
  );

  res.json({
    count: cancelledOrders.length,
    orders: cancelledOrders,
  });
});

router.get("/shipped", (req, res) => {
  const db = req.app.locals.readDB();

  const shippedOrders = db.orders.filter((order) => order.status === "shipped");

  res.json({
    count: shippedOrders.length,
    orders: shippedOrders,
  });
});

router.get("/total-revenue/:productId", (req, res) => {
  const db = req.app.locals.readDB();
  const productId = parseInt(req.params.productId);

  const product = db.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  const productOrders = db.orders.filter(
    (order) => order.productId === productId && order.status !== "cancelled",
  );

  const totalRevenue = productOrders.reduce((sum, order) => {
    return sum + order.quantity * product.price;
  }, 0);

  res.json({
    productId,
    productName: product.name,
    totalRevenue,
  });
});

router.get("/alltotalrevenue", (req, res) => {
  const db = req.app.locals.readDB();

  const validOrders = db.orders.filter((order) => order.status !== "cancelled");

  const allTotalRevenue = validOrders.reduce((total, order) => {
    const product = db.products.find((p) => p.id === order.productId);
    if (product) {
      return total + order.quantity * product.price;
    }
    return total;
  }, 0);

  res.json({
    totalRevenue: allTotalRevenue,
  });
});

module.exports = router;
