const express = require("express");
const os = require("os");
const dns = require("dns");
const getFileData = require("./read"); // Importing our custom module

const app = express();
const PORT = 3000;

// 1. Basic Test Route
app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

// 2. Read File Route
app.get("/readfile", (req, res) => {
  const data = getFileData();
  res.send(data);
});

// 3. System Details Route (Includes Bonus Task: Core Count)
app.get("/systemdetails", (req, res) => {
  const sysDetails = {
    platform: os.platform(),
    totalMemory: (os.totalmem() / 1024 ** 3).toFixed(2) + " GB",
    freeMemory: (os.freemem() / 1024 ** 3).toFixed(2) + " GB",
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length, // Bonus
  };
  res.json(sysDetails);
});

// 4. Get IP Route (Includes Bonus Task: IPv4 & IPv6)
app.get("/getip", (req, res) => {
  const hostname = "masaischool.com";

  dns.lookup(hostname, { all: true }, (err, addresses) => {
    if (err) {
      return res.status(500).json({ error: "DNS lookup failed" });
    }
    res.json({
      hostname: hostname,
      addresses: addresses, // Returns array of IPv4 and IPv6
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
