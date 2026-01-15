const express = require("express"); // Import Express
const app = express(); // Initialize app
const PORT = 3000; // Set port

// GET /home -> Returns JSON
app.get("/home", (req, res) => {
  res.json({ message: "This is home page" });
});

// GET /contactus -> Returns JSON
app.get("/contactus", (req, res) => {
  res.json({ message: "Contact us at contact@contact.com" });
});

// GET /about -> Bonus Route
app.get("/about", (req, res) => {
  res.json({ message: "Welcome to the About page!" });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
