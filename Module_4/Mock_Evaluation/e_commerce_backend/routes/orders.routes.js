const express = require("express");
const router = express.Router();

const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

router.post("/", (req, res) => {
  const db = req.app.locals.readDB();
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ error: "productId and quantity are required" });
  }

  const product = db.products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (product.stock === 0) {
    return res.status(400).json({ error: "Product out of stock" });
  }

  if (quantity > product.stock) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  const totalAmount = product.price * quantity;

  const newOrder = {
    id: db.orders.length > 0 ? Math.max(...db.orders.map((o) => o.id)) + 1 : 1,
    productId: parseInt(productId),
    quantity: parseInt(quantity),
    totalAmount,
    status: "placed",
    createdAt: getCurrentDate(),
  };

  product.stock -= parseInt(quantity);

  db.orders.push(newOrder);
  req.app.locals.writeDB(db);

  res.status(201).json(newOrder);
});

router.get("/", (req, res) => {
  const db = req.app.locals.readDB();
  res.json(db.orders);
});

router.delete("/:orderId", (req, res) => {
  const db = req.app.locals.readDB();
  const orderId = parseInt(req.params.orderId);

  const order = db.orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (order.status === "cancelled") {
    return res.status(400).json({ error: "Order is already cancelled" });
  }

  if (order.createdAt !== getCurrentDate()) {
    return res
      .status(400)
      .json({
        error: "Order can only be cancelled on the same day it was created",
      });
  }

  const product = db.products.find((p) => p.id === order.productId);
  if (product) {
    product.stock += order.quantity;
  }

  order.status = "cancelled";
  req.app.locals.writeDB(db);

  res.json({
    message: "Order cancelled successfully",
    order,
  });
});

router.patch("/change-status/:orderId", (req, res) => {
  const db = req.app.locals.readDB();
  const orderId = parseInt(req.params.orderId);
  const { status } = req.body;

  const validStatuses = ["placed", "shipped", "delivered"];
  const validTransitions = {
    placed: ["shipped"],
    shipped: ["delivered"],
    delivered: [],
    cancelled: [],
  };

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const order = db.orders.find((o) => o.id === orderId);

  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (order.status === "cancelled" || order.status === "delivered") {
    return res.status(400).json({
      error: `Cannot change status of ${order.status} order`,
    });
  }

  if (!validTransitions[order.status].includes(status)) {
    return res.status(400).json({
      error: `Cannot transition from ${order.status} to ${status}`,
    });
  }

  order.status = status;
  req.app.locals.writeDB(db);

  res.json(order);
});

module.exports = router;
