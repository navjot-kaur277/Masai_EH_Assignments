const { timeStamp } = require('console');
const fs = require ('fs');

// Logger
const logger = (req,res,next) => {
    const logEntry = `${req.method} | ${req.url} | ${new Date().toISOString()} \n`;
    fs.appendFileSync('logs.txt', logEntry);
    next();
};

// Rate 
const ipCache = {};
const rateLimiter = (req,res,next) => {
    const ip = req.ip;
    const now = Date.now();
    if (!ipCache[ip]) ipCache[ip] = [];
        ipCache[ip] = ipCache.filter(timeStamp => now - timeStamp<60000);

        if (ipCache[ip].length >= 3) {
            return res.status(429).json({message : "Too many requests.Limit 3 per minute."});
        }
        ipCache[ip].push(now);
        next();

};


    // 404 handler
    const handle404 = (req, res ) => {
        res.status(404).json({message : "This request is not found"});
    };

    module.exports = {logger,rateLimiter,handle404};
