const requestStore = new Map();

const rateLimiterMiddleware = (req, res, next) => {
  const ip = req.ip || req.connection.remoteAddress;
  const currentTime = Date.now();
  const oneMinute = 60 * 1000;

  if (!requestStore.has(ip)) {
    requestStore.set(ip, {
      count: 1,
      startTime: currentTime,
    });
  } else {
    const userRequests = requestStore.get(ip);

    // Check if within the time window
    if (currentTime - userRequests.startTime < oneMinute) {
      userRequests.count++;

      if (userRequests.count > 15) {
        return res.status(429).json({
          error: "Too many requests, please try again later",
        });
      }
      requestStore.set(ip, userRequests);
    } else {
      // Reset if more than a minute has passed
      requestStore.set(ip, {
        count: 1,
        startTime: currentTime,
      });
    }
  }

  next();
};

// Cleanup old entries every 5 minutes
setInterval(
  () => {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    for (const [ip, data] of requestStore.entries()) {
      if (now - data.startTime > fiveMinutes) {
        requestStore.delete(ip);
      }
    }
  },
  5 * 60 * 1000,
);

module.exports = rateLimiterMiddleware;
