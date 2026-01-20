const validateTodoMiddleware = (req, res, next) => {
  const body = req.body;
  const allowedKeys = ["title"];
  const bodyKeys = Object.keys(body);

  // Check if title exists and is not empty
  if (!body.title || body.title.trim() === "") {
    return res.status(400).json({
      error: "Invalid request body. 'title' is required and cannot be empty",
    });
  }

  // Check if only allowed keys are present
  const hasOnlyAllowedKeys = bodyKeys.every((key) => allowedKeys.includes(key));
  const hasSameLength = bodyKeys.length === allowedKeys.length;

  if (!hasOnlyAllowedKeys || !hasSameLength) {
    return res.status(400).json({
      error: "Invalid request body. Only 'title' is allowed",
    });
  }

  next();
};

module.exports = validateTodoMiddleware;
