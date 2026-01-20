const loggerMiddleware = (req, res, next) => {
  const timestamp = new Date()
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

module.exports = loggerMiddleware;
