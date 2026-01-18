const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const db = req.app.locals.readDB();
  res.json(db.products);
});

router.get("/:id", (req, res) => {
  const db = req.app.locals.readDB();
  const productId = parseInt(req.params.id);

  const product = db.products.find((p) => p.id === productId);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

router.post("/", (req, res) => {
  const db = req.app.locals.readDB();
  const { name, price, stock } = req.body;

  if (!name || !price || !stock) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newProduct = {
    id:
      db.products.length > 0
        ? Math.max(...db.products.map((p) => p.id)) + 1
        : 1,
    name,
    price: Number(price),
    stock: Number(stock),
  };

  db.products.push(newProduct);
  req.app.locals.writeDB(db);

  res.status(201).json(newProduct);
});

module.exports = router;
