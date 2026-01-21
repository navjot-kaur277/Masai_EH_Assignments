const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Import routes
const productsRoutes = require("./routes/products.routes");
const ordersRoutes = require("./routes/orders.routes");
const analyticsRoutes = require("./routes/analytics.routes");

// Use routes
app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/analytics", analyticsRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "E-commerce API is running!" });
});

// Start server with better logging
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Endpoints available:`);
  console.log(`   GET  http://localhost:${PORT}/products`);
  console.log(`   POST http://localhost:${PORT}/products`);
  console.log(`   POST http://localhost:${PORT}/orders`);
  console.log(`   GET  http://localhost:${PORT}/analytics/allorders`);
});

// Handle server errors
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log(`Try: kill -9 $(lsof -t -i:${PORT})`);
  } else {
    console.error("❌ Server error:", error.message);
  }
});
