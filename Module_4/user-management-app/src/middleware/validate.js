const validateUser = (req, res, next) => {
  const { name, email, password, age } = req.body;
  const errors = [];

  // Name validation
  if (!name || name.trim() === "") errors.push("Name must not be empty.");

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.push("Invalid email format.");

  // Password length validation
  if (!password || password.length < 8)
    errors.push("Password must be at least 8 characters.");

  // Age validation (optional but must be >= 18 if provided)
  if (age !== undefined && (typeof age !== "number" || age < 18)) {
    errors.push("Age must be a number and 18 or older.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  next();
};

module.exports = { validateUser };
