const fs = require("fs");

/**
 * Reads content from Data.txt
 * Includes error handling for the Bonus Task
 */
const getFileData = () => {
  try {
    const content = fs.readFileSync("./Data.txt", "utf-8");
    return content;
  } catch (err) {
    return "Error: Could not read file.";
  }
};

module.exports = getFileData;
